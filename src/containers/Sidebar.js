import { useState } from 'react';
import { connect } from "react-redux";
import { userApi, dialogsApi, filesApi } from '../utils/api';
import { Sidebar } from "../components";
import { userActions, attachmentsActions } from '../redux/actions';
import { openNotification, contryData, deleteCookie } from '../utils/helpers';


const SidebarContainer = ({ user, updateData, theme, setTheme,removeAttachment,lang, setLang }) => {
  const [visibleModalCreateDialog, setVisibleModalCreateDialog] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [visibleSettingsEdit, setVisibleSettingsEdit] = useState(false);
  const [inputValue, seInputValue] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [nameGroup, setNameGroup] = useState('');
  const [avatarSetting, setAvatarSetting] = useState(user && user.avatar);
  const [nameInputSetting, setNameInputeSetting] = useState(user && user.fullname);
  const [emailInputSetting, setEmailInputSetting] = useState(user && user.email);
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordOldVerify, setPasswordOldVerify] = useState(false);
  const [avatarDialog, setAvatarDialog] = useState([]);
  const onCloseModalCreateDialog = () => {
    setVisibleModalCreateDialog(false);
  };
  const onShowSettings = () => {
    setVisibleSettings(true);
  }
  const onCloseSettings = () => {
    setVisibleSettings(false);
    setVisibleSettingsEdit(false)
  };

  const onShowModalCreateDialog = () => {
    setVisibleModalCreateDialog(true);
  }
  const toggleVisibleSettingsEdit = () => {
    setVisibleSettingsEdit(!visibleSettingsEdit);
    setNameInputeSetting(user.fullname)
    setEmailInputSetting(user.email)
    setAvatarSetting(user.avatar);
  };
  const handleChangeInput = (value) => {
    seInputValue(value)
  }

  const onChangeTextArea = e => {
    setMessageText(e.target.value)
  }

  const onSearch = (value) => {
    setIsLoading(true)
    userApi.findUsers(value)
      .then(({ data }) => {
        setUsers(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  const onAddDialog = () => {
    if(inputValue.length === 1){
    dialogsApi
      .create({
        partner: inputValue[0],
        text: messageText
      })
      .then(  onCloseModalCreateDialog  )
      .catch(() => {
        setIsLoading(false)
        openNotification({
          title: "Ошибка при попытки создать диалог",
          text: "Такой пользователь уже существует",
          type: "error"
        });
      })
    }else{
      if(avatarDialog[0]){
          if(nameGroup){
            dialogsApi
            .createGroup({
              partner: inputValue,
              text: messageText,
              avatar: avatarDialog[0].uid,
              name:nameGroup
            })
            .then(onCloseModalCreateDialog)
            .catch(() => {
              setIsLoading(false)
              openNotification({
                title: "Ошибка при попытки создать диалог",
                text: "Такой пользователь уже существует",
                type: "error"
              });
            })
          }else{
            openNotification({
              title: "Введите название группы",
              type: "error"
            });
          }
      }else{
        openNotification({
          title: "Выберите аватар",
          type: "error"
        });
      }
    }
  }
  const onSelectUser = userId => {
    setSelectedUserId(inputValue)
  }

  const onSelectAvatarDialog = async files => {
    let uploaded = [];

        const file = files[0];
        const uid = Math.round(Math.random() * 1000);
        uploaded = [
          {
            uid,
            name: file.name,
            status: 'uploading',
          },
        ];
        setAvatarDialog(uploaded);
        // eslint-disable-next-line no-loop-func
        await filesApi.upload(file).then(({ data }) => {
          console.log(data);
          uploaded = uploaded.map(item => {
            if (item.uid === uid) {
              return {
                status: 'done',
                uid: data.file._id,
                name: data.file.filename,
                url: data.file.url,
              };
            }
            return item;
          });
        });
      
        setAvatarDialog(uploaded);
  };
  // Загрузка аватара 
  const onSelectFiles = async files => {
    // eslint-disable-next-line no-loop-func
    setIsLoading(true)
    await filesApi.upload(files[0]).then(({ data }) => {
      setAvatarSetting([data.file])
      setIsLoading(false)
    });
  };
  const sendChangeProfile = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newData = {};
    if (user.fullname !== nameInputSetting  && nameInputSetting.length > 0) {
      newData.fullname = nameInputSetting;
    }
    else {
      newData.fullname = user.fullname;
    }
    if (user.email !== emailInputSetting && emailInputSetting.length > 0 ) {
      newData.email = emailInputSetting;
    } else {
      newData.email = user.email;
    }
    if (user.avatar[0]) {
      if (user.avatar[0]._id !== avatarSetting[0]._id) {
        newData.avatar = avatarSetting[0]._id;
      } else {
        newData.avatar = user.avatar[0]._id
      }
    } else {
      if (avatarSetting[0]) {
        newData.avatar = avatarSetting[0]._id;
      } else {
        newData.avatar = [];
      }
    }
    if (newData !== {}) {
      userApi.update(newData).then((data) => {

        updateData(data.data)
        setIsLoading(false)
        openNotification({
          title: "Операция прошла успешна",
          text: "Данные успешно изменены",
          type: "success"
        });
      }).catch(() => {
        openNotification({
          title: "Ошибка при попытки изменить данные пользователя",
          text: "Неизвестная ошибка",
          type: "error"
        });
      })
    }
  }

  const onSelectTheme = (e) => {
    setTheme(e.target.value)
  }
  const passwordVerificationFunc = (event) => {
    event.preventDefault();
    if (passwordOldVerify === false) {
      userApi.passwordVerification({
        email: user.email,
        password: passwordOld
      }).then((response) => {
        if (response.data.status === 'success') {
          setPasswordOldVerify(true)
          openNotification({
            title: "Верный пароль",
            text: "",
            type: "success"
          });
        }
      }).catch(({ response }) => {
        setPasswordOldVerify(false)
        if (response.data.message === "Incorrect password") {
          openNotification({
            title: "Ошибка при проверки пароля",
            text: "Неверный пароль!",
            type: "error"
          });
        } else {
          openNotification({
            title: "Ошибкleshadjet@gmail.comа при проверки пароля",
            text: "Неизвестная ошибка,  проблемы с сервером ",
            type: "error"
          });
        }
      })
    } else {
      if (passwordOld !== passwordNew) {
        userApi.updatePassword({ password: passwordNew }).then(({ data }) => {
          openNotification({
            title: "Операция прошла успешна",
            text: "Пароль успешно изменён",
            type: "success"
          });
        }).catch(({ response }) => {
          openNotification({
            title: "Ошибка при изменение пароля",
            text: "Неизвестная ошибка,  проблемы с сервером ",
            type: "error"
          });
        }).finally(() => {
          setPasswordOldVerify(false)
          setPasswordNew('');
          setPasswordOld('')
        })
      } else {
        openNotification({
          title: "Ошибка при изменение пароля",
          text: "Новый пароль должен быть отличным , от старого пароля",
          type: "error"
        });
        setPasswordOldVerify(false)
        setPasswordNew('');
        setPasswordOld('')
      }



    }
  }
  const closeAccount = () => {
    deleteCookie('refTKn');
    deleteCookie('acsTKn');
    window.location.replace("/signin");
  }
  const onDeleteAccount = () => {
    if (window.confirm('Вы действительно хотите удалить Аккаунт? ')) {
      userApi.deleteMe().then(() => {
        openNotification({
          title: "Операция прошла успешна",
          text: "Аккаунт удален",
          type: "success"
        });
        deleteCookie('refTKn');
        deleteCookie('acsTKn');

      }).catch(() => {
        openNotification({
          title: "Ошибка при удаление аккаунта",
          type: "error"
        });
      })
        .finally(() => {
          window.location.replace("/");
        })

    }
  }
  const onRemoveAvatarDialog= (item)=>{
    setAvatarDialog([])
    removeAttachment(item)
  }
  const onSelectLang = (item)=>{
    setLang(item)
  }
  return <Sidebar user={user}
    inputValue={inputValue}
    onSearch={onSearch}
    onSelectUser={onSelectUser}
    onChangeInput={handleChangeInput}
    isLoading={isLoading}
    visibleModalCreateDialog={visibleModalCreateDialog}
    onCloseModalCreateDialog={onCloseModalCreateDialog}
    onShowModalCreateDialog={onShowModalCreateDialog}
    visibleSettings={visibleSettings}
    onCloseSettings={onCloseSettings}
    onShowSettings={onShowSettings}
    selectedUserId={selectedUserId}
    onChangeTextArea={onChangeTextArea}
    onRemoveAvatarDialog={onRemoveAvatarDialog}
    messageText={messageText}
    onModalOk={onAddDialog}
    users={users}
    onSelectLang={onSelectLang}
    nameGroup={nameGroup}
    setNameGroup={setNameGroup}
    visibleSettingsEdit={visibleSettingsEdit}
    toggleVisibleSettingsEdit={toggleVisibleSettingsEdit}
    nameInputSetting={nameInputSetting}
    setNameInputeSetting={setNameInputeSetting}
    emailInputSetting={emailInputSetting}
    setEmailInputSetting={setEmailInputSetting}
    avatarSetting={avatarSetting}
    sendChangeProfile={sendChangeProfile}
    onSelectFiles={onSelectFiles}
    onSelectTheme={onSelectTheme}
    theme={theme}
    lang={lang}
    onSelectAvatarDialog={onSelectAvatarDialog}
    avatarDialog={avatarDialog}
    setPasswordOld={setPasswordOld}
    passwordOld={passwordOld}
    passwordNew={passwordNew}
    setPasswordNew={setPasswordNew}
    passwordOldVerify={passwordOldVerify}
    passwordVerificationFunc={passwordVerificationFunc}
    closeAccount={closeAccount}
    onDeleteAccount={onDeleteAccount}
    contryData={contryData}
  />
}


export default connect(({ user }) => ({
  user: user.data,
  theme: user.theme,
  lang: user.lang
}), {...userActions, ...attachmentsActions})(SidebarContainer);