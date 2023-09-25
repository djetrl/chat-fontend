import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { filesApi,dialogsApi } from '../utils/api';
import { SidebarPartner } from "../components";
import {userActions, dialogsActions } from '../redux/actions';
import { useNavigate } from "react-router-dom";
import { openNotification } from '../utils/helpers';

const SidebarPartnerContainer = ({ user, dialogs, currentDialogId, toggleSidebarPartner, SidebarPartnerRedux, fetchDialogs }) => {
  const [currentDialog, setCurrentDialog] = useState(null)
  const [userPartner, setUserPartner] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [dialogsAvatar, setDialogsAvatar] = useState([])
  const [dialogsName, setDialogsName] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [selectMembers,setSelectMembers ] = useState('');
  const [messageText, setMessageText] = useState('');
  const [visibleModalCreateDialogPartner, setVisibleModalCreateDialogPartner] = useState(false);
  const [sectionSelect, setSectionSelect] = useState('photo');
  const [imAuthor, setImAuthor] = useState(false);
  const [visibleSettingsEdit, setVisibleSettingsEdit] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentDialog(dialogs.filter(item => item._id === currentDialogId))
      if(currentDialog && currentDialog[0]  && currentDialog[0].name){
          setDialogsAvatar(currentDialog[0].avatar)
          setDialogsName(currentDialog[0].name)
          if (currentDialogId && currentDialog[0].author._id === user._id) {
            setImAuthor(true)
          }
      }else{
        setDialogsAvatar([])
        setDialogsName(null)
      }
      setVisibleSettingsEdit(false)
  }, [dialogs, currentDialogId])

  useEffect(() => {
    if (currentDialog && currentDialog[0]) {
      setAllMembers([currentDialog[0].author, ...currentDialog[0].partner])
      if (currentDialog[0].author._id !== user._id) {
        setUserPartner(currentDialog[0].author)
      }
      else {
        setUserPartner(currentDialog[0].partner[0])
      }
    }
  }, [currentDialog])
  useEffect(() => {
    if (currentDialogId && SidebarPartnerRedux) {
      filesApi.getAllByDialogId(currentDialogId).then(({ data }) => {
        let newAttachments = [];
        if (data) {
          data.map(item => {
            if (item.attachments.length !== 0) {
              newAttachments.push(...item.attachments);
            }
          })
          if (newAttachments.length > 0) {
            setAttachments(newAttachments)
          }
        }

      })
    }
  }, [currentDialogId,SidebarPartnerRedux])
  const onSelectSection = (event) => {
    setSectionSelect(event.target.id);
  }
  const onSelectDialogThisMember = (event, id)=>{
      if(event.target.tagName !== "svg" && event.target.tagName !== "BUTTON" && event.target.classList[0] !=='avatar' && event.target.classList[0] !=='anticon' && event.target.classList[0] !=='ant-image-mask-info'  && event.target.classList[0] !=='ant-image-mask'  ){
        dialogsApi.getAll().then(async ({data})=>{
          let dialog = data.filter( dialog=>  (dialog.partner.length === 1 && dialog.partner[0]._id === id) || (dialog.author._id === id && dialog.author._id !== user._id ))
          if(dialog){
            return navigate(`/dialog/${dialog[0]._id}`);
          }
        })
        .catch(err=>{
          setSelectMembers(id)
          setVisibleModalCreateDialogPartner(true);
        })
      }
  }
  const onChangeTextArea = e => {
    setMessageText(e.target.value)
  }
  const onAddDialog = () => {
    setIsLoading(true)

    dialogsApi
      .create({
        partner: selectMembers,
        text: messageText
      })
      .then(()=>{
        setVisibleModalCreateDialogPartner(false);
        setMessageText('')
        if(currentDialog){
          return navigate(`/dialog/${selectMembers}`);
        }

      })
      .catch(() => {
        setIsLoading(false)
        openNotification({
          title: "Ошибка при попытки создать диалог",
          text: "Неизвестная ошибка 404",
          type: "error"
        });
      })
  }
  const onDeletePartnerFromDialog = (id)=>{
    dialogsApi.deletePartnerForGroup({dialog:currentDialogId, partner:id})
    .then(({data})=>{
        setAllMembers( allMembers.filter(idMembers=>idMembers._id !== id));
    })
    .catch((err)=>{
      console.log(err);
    })

  }
  const onToogleVisibleSettingsEdit = ()=>{
    setVisibleSettingsEdit(!visibleSettingsEdit)
  }
  const onSelectFiles = async files => {
    // eslint-disable-next-line no-loop-func
    setIsLoading(true)
    await filesApi.upload(files[0]).then(({ data }) => {
      setDialogsAvatar([data.file])
      setIsLoading(false)
    });
  };
  const sendChangeDialog = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newData = {};
    console.log(currentDialog[0].name);
    if (currentDialog[0].name !== dialogsName) {
      newData.name = dialogsName;
    }
    else {
      newData.name = currentDialog[0].name;
    }

      if (currentDialog[0].avatar[0]._id !== dialogsAvatar[0]._id) {
        newData.avatar = dialogsAvatar[0]._id;
      } else {
        newData.avatar = currentDialog[0].avatar[0]._id
      }
    newData._id=currentDialog[0]._id
    if (newData !== {}) {
      dialogsApi.update(newData)
      .then((data) => {
        fetchDialogs();
        openNotification({
          title: "Операция прошла успешна",
          text: "Данные успешно изменены",
          type: "success"
        });
      })
      .catch(() => {
        openNotification({
          title: "Ошибка при попытки изменить данных диалога",
          text: "Неизвестная ошибка",
          type: "error"
        });
      })
      .finally(()=>{
        setIsLoading(false)
      })
    }
  }
  if (!currentDialogId) {
    return null
  }
  return <SidebarPartner
    user={userPartner}
    currentDialog={currentDialog}
    attachments={attachments}
    dialogsAvatar={dialogsAvatar}
    dialogsName={dialogsName}
    sendChangeDialog={sendChangeDialog}
    sectionSelect={sectionSelect}
    onDeletePartnerFromDialog={onDeletePartnerFromDialog}
    onSelectSection={onSelectSection}
    toggleSidebarPartner={toggleSidebarPartner}
    onSelectDialogThisMember={onSelectDialogThisMember}
    onChangeTextArea={onChangeTextArea}
    onModalOk={onAddDialog}
    visibleSettingsEdit={visibleSettingsEdit}
    onToogleVisibleSettingsEdit={onToogleVisibleSettingsEdit}
    messageText={messageText}
    allMembers={allMembers}
    setDialogsName={setDialogsName}
    isLoading={isLoading}
    avatar={currentDialog[0] && currentDialog[0].avatar}
    name={ currentDialog[0] && currentDialog[0].name}
    onSelectFiles={onSelectFiles}
    setDialogsAvatar={setDialogsAvatar}
    setVisibleModalCreateDialogPartner={setVisibleModalCreateDialogPartner}
    visibleModalCreateDialogPartner={visibleModalCreateDialogPartner}
    SidebarPartnerRedux={SidebarPartnerRedux}
    imAuthor={imAuthor} />
}


export default connect(({ user, dialogs }) => ({
  user: user.data,
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  SidebarPartnerRedux: user.SidebarPartner,
}), {...userActions, ...dialogsActions })(SidebarPartnerContainer);