import { useState, useEffect } from "react";
import { Status as StatusBase } from "../components";
import { connect } from "react-redux";
import { dialogsApi } from '../utils/api';
import { dialogsActions, userActions, messagesActions } from "../redux/actions";
import { useNavigate } from "react-router-dom";
const Status = ({ currentDialogId, user, dialogs, setCurrentDialogId, deleteDialogs, SidebarPartner, toggleSidebarPartner, setFilter }) => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = new useNavigate();
  useEffect(() => {
    setFilter('');
    setInputValue('');
    setVisibleInput(false);
    toggleSidebarPartner(false);
  }, [currentDialogId])
  if (!dialogs.length || !currentDialogId) {
    return null;
  }
  const toggleVisibleInput = () => {
    setVisibleInput(!visibleInput);
  }
  const currentDialogObj = dialogs.filter(dialog => dialog._id === currentDialogId)[0];
  // TODO: Сделать фильтрацию  с помощью запросов к бэку как в компоненте Dialogs
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
  return <StatusBase
    online={partner.isOnline}
    fullname={partner.fullname}
    onDeleteDialog={onDeleteDialog}
    toggleSidebarPartnerFunc={toggleSidebarPartnerFunc}
    visibleInput={visibleInput}
    toggleVisibleInput={toggleVisibleInput}
    inputValue={inputValue}
    changeSearchInput={changeSearchInput} />
}

export default connect(
  ({ dialogs, user, messages }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    user: user.data,
    SidebarPartner: user.SidebarPartner,
    filter: messages.filter
  }), { ...dialogsActions, ...userActions, ...messagesActions })(Status);