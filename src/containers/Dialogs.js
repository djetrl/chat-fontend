import { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { dialogsActions, userActions } from '../redux/actions';
import socket from '../core/socket';

import { Dialogs as BaseDialogs } from "../components";

const Dialogs = ({ fetchDialogs, updateReadedStatus, currentDialogId, items, userId,toggleSidebar  }) => {
  const [inputValue, setValue] = useState('');
  const [filtred, setFiltredItems] = useState(Array.from(items));

  const onChangeInput = (value = '') => {
    if (filtred) {
      setFiltredItems(
        items.filter(
          (dialog)=>{
            if(dialog.partner.length === 1){
              return(
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                dialog.partner[0].fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 
              )
            }else{
              return (dialog.name && dialog.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 )
              
           }
          }
        ),
      );
    }
    setValue(value);
  };

  window.fetchDialogs = fetchDialogs;
  useEffect(() => {
    if (items.length) {
      onChangeInput();
    }
  }, [items]);

  useEffect(() => {
    if(items.length === 0){
      fetchDialogs();
    }

    socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
    socket.on('SERVER:DIALOG_DELETED', () => { onChangeInput() });
    socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
    socket.on('SERVER:MESSAGES_READED', updateReadedStatus);
    socket.on('SERVER:ADD_USER_DIALOG', fetchDialogs);
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
      socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
      socket.removeListener('SERVER:DIALOG_DELETED', () => { onChangeInput() });
      socket.removeListener('SERVER:ADD_USER_DIALOG', fetchDialogs);
    };
  }, []);
  const onCloseSidebar = ()=>{
    toggleSidebar(false)
  }
  return (
    <BaseDialogs
      userId={userId}
      items={filtred}
      onSearch={onChangeInput}
      inputValue={inputValue}
      currentDialogId={currentDialogId}
      onCloseSidebar={onCloseSidebar}
    />
  );
};
export default connect(({ dialogs }) => dialogs, {...dialogsActions , ...userActions})(Dialogs);