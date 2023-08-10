import React,{ useEffect,useRef, useState } from "react";
import {connect} from 'react-redux';
import { Empty } from "antd";
import { find } from "lodash";
import { messagesApi } from "../utils/api";
import {messagesActions, userActions} from '../redux/actions'
import socket from "../core/socket";
import { Messages as BaseMessages} from "../components";
import Item from "antd/es/list/Item";
const MemoizedBaseMessages= React.memo(BaseMessages);

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
  total,
  SidebarPartner,
  toggleSidebarPartner,
  filter
}) => {
  
  const [previewImage, setPreviewImage] = useState(null);
  const [blockHeight, setBlockHeight] = useState(135);
  const [isTyping, setIsTyping] = useState(false);
  const [messageLength, setMessageLength] = useState(15);
  const [loadingNewMessage, setLoadingNewMessage] = useState(false);
  const [filteredItem, setFilteredItem] = useState([])
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
    setMessageLength(Item.length)
  }, []);
  useEffect(() => {
    if (attachments.length) {
      setBlockHeight(245);
    } else {
      setBlockHeight(135);
    }
  }, [items.length, attachments]);

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }
    
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
  }, [currentDialog]);

  
  useEffect(() => {
    if(messagesRef.current){
      messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight );
    }
  }, [total, isTyping,filter]);
  useEffect(()=>{
    if(items){
      if(filter){
        messagesApi.findMessages(currentDialog._id, filter).then((message)=>{
          setFilteredItem(message.data)
          setLoadingNewMessage(false) 
        }).catch(()=>{
          setFilteredItem(items)
        })
      }else{
        setFilteredItem(items)
      }
    }
  },[filter])

  const handleLoadNewMessage =(e,messageLength=15,currentDialog,items)=>{
    if(filter.trim() === ''){
      if( e.target.scrollTop === 0 ){
        if(messageLength > 0){
              if((messageLength < total) && !loadingNewMessage){
                setLoadingNewMessage(true)
              messagesApi.getAllByDialogId(currentDialog._id, messageLength).then((data)=>{
                if(items[0] || items && data.data.messages > 0 ){
                  if(items[0]._id !== data.data.messages[0]._id){
                    additionalLoadingMessage(data.data.messages)
                    setMessageLength(data.data.messages.length + messageLength) 
                    setLoadingNewMessage(false) 
                    e.target.scrollBy(0, 50 );
                  }
                }
              })
            }
        }
    }
    }
  }

  const toggleSidebarPartnerFunc= ()=>{
    toggleSidebarPartner(!SidebarPartner)
  }

  if (!currentDialog) {
    return <Empty description="Откройте диалог" />;
  }


  return (
    <MemoizedBaseMessages
      user={user}
      blockRef={messagesRef}
      items={filter.trim() !=='' ? filteredItem:items}
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
      loadingNewMessage={loadingNewMessage}
      toggleSidebarPartnerFunc={toggleSidebarPartnerFunc}
    />
  );
};

export default connect(
  ({ dialogs, messages, user, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    filter: messages.filter,
    total: messages.total,
    isLoading: messages.isLoading,
    attachments: attachments.items,
    user: user.data,
    SidebarPartner: user.SidebarPartner
  }),
  {...messagesActions,...userActions}
)(Dialogs);