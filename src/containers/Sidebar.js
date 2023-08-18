import { useState } from 'react';
import { connect } from "react-redux";
import { userApi, dialogsApi, filesApi } from '../utils/api';
import { Sidebar } from "../components";
import { userActions } from '../redux/actions';
import { openNotification } from '../utils/helpers';

const SidebarContainer = ({ user, updateData, theme, setTheme }) => {
  const [visibleModalCreateDialog, setVisibleModalCreateDialog] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [visibleSettingsEdit, setVisibleSettingsEdit] = useState(false);
  const [inputValue, seInputValue] = useState('');
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [avatarSetting, setAvatarSetting] = useState(user && user.avatar);
  const [nameInputSetting, setNameInputeSetting] = useState(user && user.fullname);
  const [emailInputSetting, setEmailInputSetting] = useState(user && user.email);
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordOldVerify, setPasswordOldVerify] = useState(false);
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
    dialogsApi
      .create({
        partner: selectedUserId,
        text: messageText
      })
      .then(onCloseModalCreateDialog)
      .catch(() => {
        setIsLoading(false)
      })
  }
  const onSelectUser = userId => {
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
  const sendChangeProfile = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newData = {};
    if (user.fullname !== nameInputSetting) {
      newData.fullname = nameInputSetting;
    }
    else {
      newData.fullname = user.fullname;
    }
    if (user.email !== emailInputSetting) {
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
            title: "Ошибка при проверки пароля",
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
    localStorage.removeItem('token');
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
        localStorage.removeItem('token');

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
    onSelectTheme={onSelectTheme}
    theme={theme}

    setPasswordOld={setPasswordOld}
    passwordOld={passwordOld}
    passwordNew={passwordNew}
    setPasswordNew={setPasswordNew}
    passwordOldVerify={passwordOldVerify}
    passwordVerificationFunc={passwordVerificationFunc}
    closeAccount={closeAccount}
    onDeleteAccount={onDeleteAccount}
  />
}


export default connect(({ user }) => ({
  user: user.data,
  theme: user.theme,
}), userActions)(SidebarContainer);