import { useEffect,useRef, useState} from "react";
import {connect} from 'react-redux';
import { Empty } from "antd";
import { find } from "lodash";
import { messagesApi } from "../utils/api";
import {messagesActions} from '../redux/actions'
import socket from "../core/socket";

import { Messages as BaseMessages} from "../components";
import { da } from "date-fns/locale";

const Dialogs = ({
  currentDialog,
  fetchMessages,
  addMessage,
  items,
  user,
  isLoading,
  removeMessageById,
  attachments,
  additionalLoadingMessage,
  total
}) => {
  
  const [previewImage, setPreviewImage] = useState(null);
  const [blockHeight, setBlockHeight] = useState(135);
  const [isTyping, setIsTyping] = useState(false);
  const [messageLength, setMessageLength] = useState(15);
  let typingTimeoutId = null;

  const messagesRef = useRef(null);

  const toggleIsTyping = () => {
    setIsTyping(true);
    clearInterval(typingTimeoutId);
    typingTimeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };
  const onNewMessage = data => {
    addMessage(data);
  };
  useEffect(() => {
    socket.on('DIALOGS:TYPING', toggleIsTyping);
  }, []);
  useEffect(() => {
    if (attachments.length) {
      setBlockHeight(245);
    } else {
      setBlockHeight(135);
    }
  }, [attachments]);

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }
    
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
  }, [currentDialog]);

  
  useEffect(() => {
    if(messagesRef.current){
      messagesRef.current.scrollTo(0, 999999);
    }
  }, [messagesRef.current, isTyping]);

  const handleLoadNewMessage =(e,messageLength=15,currentDialog,items)=>{
    if(e.target.scrollTop >= 200  || e.target.scrollTop <= 200   ){
        if(messageLength > 0){
          console.log(messageLength < total - 15);
              if(messageLength < total){
              messagesApi.getAllByDialogId(currentDialog._id, messageLength).then((data)=>{
                if(items[0] || items && data.data.messages > 0 ){
                  if(items[0]._id !== data.data.messages[0]._id){
                    additionalLoadingMessage(data.data.messages)
                    setMessageLength(data.data.messages.length + messageLength)  
                  }
                }
              })
            }
        }
    }
  }



  if (!currentDialog) {
    return <Empty description="Откройте диалог" />;
  }


  return (
    <BaseMessages
      user={user}
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading && !user}
      onRemoveMessage={removeMessageById}
      messageLength={messageLength}
      currentDialog={currentDialog}
      setPreviewImage={setPreviewImage}
      previewImage={previewImage}
      blockHeight={blockHeight}
      isTyping={isTyping}
      partner={
        user._id !== currentDialog.partner._id ? currentDialog.author : currentDialog.partner
      }
      handleLoadNewMessage={handleLoadNewMessage}
    />
  );
};

export default connect(
  ({ dialogs, messages, user, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    total: messages.total,
    isLoading: messages.isLoading,
    attachments: attachments.items,
    user: user.data,
  }),
  messagesActions,
)(Dialogs);