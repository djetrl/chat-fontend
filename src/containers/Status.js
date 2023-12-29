import { useState, useEffect } from "react";
import { Status as StatusBase } from "../components";
import { connect } from "react-redux";
import { dialogsApi,userApi } from '../utils/api';
import { dialogsActions, userActions, messagesActions } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { openNotification, getCookie } from "../utils/helpers";
const Status = ({ currentDialogId, user, dialogs, setCurrentDialogId, deleteDialogs ,SidebarPartner, fetchMessages,  toggleSidebarPartner, setFilter, toggleSidebar }) => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValueSearchPartner, seInputValueSearchPartner] = useState('');
  const navigate = new useNavigate();
  const [visibleModalCreateDialog, setVisibleModalCreateDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [imAuthor, setImAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentDialogObj = dialogs.filter(dialog => dialog._id === currentDialogId)[0];
  useEffect(() => {
    setFilter('');
    setInputValue('');
    setVisibleInput(false);
    toggleSidebarPartner(false);
    if (currentDialogId && currentDialogObj.author._id === user._id) {
      setImAuthor(true)
    }
  }, [currentDialogId])
  useEffect(() => {
      console.log(currentDialogId);
    let originalCookie = document.cookie;

    const interval = setInterval(() => {
      if (originalCookie !== document.cookie) {
        originalCookie = document.cookie
        if(!getCookie('acsTKn') && user && user._id){
          userApi.updateToken(getCookie('refTKn')).then(({data})=>{
            const {  token } = data;
            window.axios.defaults.headers.common["token"] = token.accessToken.token;
            fetchMessages(currentDialogId)
            .catch((err)=>{
              console.err(err);
            })
          }).catch(error=>{
            if(!getCookie('acsTKn') && !getCookie('refTKn')){
              // window.location.replace("/signin");
            }
          })
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [user]);
  const toggleVisibleInput = () => {
    setVisibleInput(!visibleInput);
  }
  if (!dialogs.length || !currentDialogId) {
    return null;
  }

  let partner = {};
  if (currentDialogId && currentDialogObj.author._id === user._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj.author;
  }
  const onDeleteDialog = () => {
    if (window.confirm(
      'Вы действительно хотите удалить диалог? при удалении все сообщения удаляются у всех участников диалога без возможности возврата'
    )) {
      dialogsApi.delete(currentDialogId)
        .then(() => {
          deleteDialogs(currentDialogId);
          if(window.innerWidth < 1200){
            toggleSidebarPartner(false);
            toggleSidebar(true);
          }
          setCurrentDialogId('');
          navigate('/')
        })

    }
  }
  const toggleSidebarPartnerFunc = () => {
    toggleSidebarPartner(!SidebarPartner)
  }
  const changeSearchInput = (e) => {
    setInputValue(e.target.value);
    setFilter(e.target.value);


  }
  const onToggleSidebar =()=>{
    if(window.innerWidth < 1200){
      toggleSidebarPartner(false);
      toggleSidebar(true);
    }
  }
  const onShowModalCreateDialog = () => {
    setVisibleModalCreateDialog(true);
  }
  const onCloseModalCreateDialog = () => {
    setVisibleModalCreateDialog(false);
  };
  const handleChangeInput = (value) => {
    seInputValueSearchPartner(value)
  }
  const onSearch = (value) => {
    setIsLoading(true)
    userApi.findUsers(value)
      .then(({ data }) => {
        setUsers(data.filter(userSearch=>{
          if(userSearch._id !== currentDialogObj.author._id ){
            return userSearch
          }
        }))
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  const onAddDialog = () => {
    dialogsApi.addUserGroup({
      partner:inputValueSearchPartner,
      dialog:currentDialogId
    })
    .catch((err)=>{
      if(err.response.data.message === 'the user is already in the dialogs'){
     openNotification({
          title: "Ошибка при попытки добавить пользователя в диалог ",
          text: "Такой пользователь уже существует в диалоги",
          type: "error"
        });
      }else{
        openNotification({
          title: "Ошибка при попытки добавить пользователя в диалог ",
          text: "Неизвестная",
          type: "error"
        });
      }
    }).finally(()=>{
          setIsLoading(false)
          onCloseModalCreateDialog();
    })
  }
  const onDeletePartnerFromDialog = (id)=>{
    dialogsApi.deletePartnerForGroup({dialog:currentDialogId, partner:id})
    .then(()=>{
      deleteDialogs(currentDialogId);
      if(window.innerWidth < 1200){
        toggleSidebarPartner(false);
        toggleSidebar(true);
      }
      setCurrentDialogId('');
      navigate('/')
    })
    .catch((err)=>{
      console.log(err);
    })

  }
  return <StatusBase
    online={partner[0] && partner[0].isOnline}
    fullname={partner[0].fullname}
    partnerLength = {partner.length}
    nameDiaglog={currentDialogObj ? currentDialogObj.name : null}
    onDeleteDialog={onDeleteDialog}
    toggleSidebarPartnerFunc={toggleSidebarPartnerFunc}
    visibleInput={visibleInput}
    toggleVisibleInput={toggleVisibleInput}
    inputValue={inputValue}
    changeSearchInput={changeSearchInput} 
    onToggleSidebar={onToggleSidebar}
    onModalOk={onAddDialog}
    onSearch={onSearch}
    onChangeInput={handleChangeInput}
    users={users}
    imAuthor={imAuthor}
    inputValueSearchPartner={inputValueSearchPartner}
    onShowModalCreateDialog={onShowModalCreateDialog}
    onDeletePartnerFromDialog={onDeletePartnerFromDialog}
    visibleModalCreateDialog={visibleModalCreateDialog}
    isLoading={isLoading}
    onCloseModalCreateDialog={onCloseModalCreateDialog}/>
}

export default connect(
  ({ dialogs, user, messages }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    user: user.data,
    SidebarPartner: user.SidebarPartner,
    Sidebar: user.Sidebar,
    filter: messages.filter
    
  }), { ...dialogsActions, ...userActions, ...messagesActions })(Status);