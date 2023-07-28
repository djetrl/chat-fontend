import { useState } from 'react';
import { connect } from "react-redux";
import { userApi,dialogsApi, filesApi} from '../utils/api';
import { Sidebar  } from "../components";
import { userActions } from '../redux/actions';
const SidebarContainer = ({user,updateData,dialogs})=>{
  const [visibleModalCreateDialog, setVisibleModalCreateDialog] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [visibleSettingsEdit, setVisibleSettingsEdit] = useState(false);
  const [inputValue, seInputValue] = useState('');
  const [ messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [avatarSetting, setAvatarSetting] = useState(user && user.avatar);
  const [nameInputSetting, setNameInputeSetting] = useState(user && user.fullname);
  const [emailInputSetting, setEmailInputSetting] = useState(user && user.email);
  const onCloseModalCreateDialog = ()=>{
    setVisibleModalCreateDialog(false);
  };

  const onShowSettings =()=> {
    setVisibleSettings(true);
  }
  const onCloseSettings = ()=>{
    setVisibleSettings(false);
    setVisibleSettingsEdit(false)
  };

  const onShowModalCreateDialog =()=> {
    setVisibleModalCreateDialog(true);
  }
  const toggleVisibleSettingsEdit = ()=>{
    setVisibleSettingsEdit(!visibleSettingsEdit);
    setNameInputeSetting(user.fullname)
    setEmailInputSetting(user.email)
    setAvatarSetting(user.avatar);
  };
  const handleChangeInput = (value)=>{
    seInputValue(value)
  }

  const onChangeTextArea = e =>{
    setMessageText(e.target.value)
  }

  const onSearch = (value)=>{ 
    setIsLoading(true)
    userApi.findUsers(value)
      .then(({data})=>{
        setUsers(data)
        setIsLoading(false)
      })
      .catch(()=>{ 
        setIsLoading(false)
      })
  }
  const onAddDialog=()=>{
    dialogsApi
      .create({
        partner:selectedUserId,
        text:messageText
      })
      .then(onCloseModalCreateDialog)
      .catch(()=>{ 
        setIsLoading(false)
      })
  }
  const onSelectUser = userId=>{
    setSelectedUserId(userId)
  }

// Загрузка аватара 
const onSelectFiles = async files => {
  // eslint-disable-next-line no-loop-func
  setIsLoading(true)
  await filesApi.upload(files[0]).then(({ data }) => {
      setAvatarSetting([data.file])
      setIsLoading(false)
    });
 };
const sendChangeProfile =(e)=>{
  e.preventDefault()
  setIsLoading(true)
  const newData = {};
  if(user.fullname !== nameInputSetting){
    newData.fullname = nameInputSetting;
  }
  else{
    newData.fullname = user.fullname;
  }
  if(user.email !== emailInputSetting){
    newData.email = emailInputSetting;
  }else{
    newData.email = user.email;
  }
  if(user.avatar[0]){
    if(user.avatar[0]._id !== avatarSetting[0]._id){
      newData.avatar = avatarSetting[0]._id;
    }else{
      newData.avatar = user.avatar[0]._id
    }
  }else{
    if(avatarSetting[0]){
      newData.avatar = avatarSetting[0]._id;
    }else{
      newData.avatar = [];
    }
  }
  if(newData !=={}){
      userApi.update(newData).then((data)=>{

        updateData(data.data)
        setIsLoading(false)
      })
  }
}
  return <Sidebar user={user} 
                  inputValue={inputValue} 
                  onSearch={onSearch} 
                  onChangeInput={handleChangeInput} 
                  onSelectUser={onSelectUser}
                  isLoading={isLoading}
                  visibleModalCreateDialog={visibleModalCreateDialog} 
                  onCloseModalCreateDialog={onCloseModalCreateDialog} 
                  onShowModalCreateDialog={onShowModalCreateDialog}
                  visibleSettings={visibleSettings}
                  onCloseSettings={onCloseSettings} 
                  onShowSettings={onShowSettings}
                  selectedUserId={selectedUserId}
                  onChangeTextArea={onChangeTextArea}
                  messageText={messageText}
                  onModalOk={onAddDialog}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  users={users}
                  visibleSettingsEdit={visibleSettingsEdit}
                  toggleVisibleSettingsEdit={toggleVisibleSettingsEdit}
                  nameInputSetting={nameInputSetting}
                  setNameInputeSetting={setNameInputeSetting}
                  emailInputSetting={emailInputSetting}
                  setEmailInputSetting={setEmailInputSetting}
                  avatarSetting={avatarSetting}
                  sendChangeProfile={sendChangeProfile}
                  onSelectFiles={onSelectFiles}
                  />
}


export default connect(({user,dialogs})=>({
  user:user.data,
  dialogs:dialogs.currentDialogId
}), userActions)(SidebarContainer);