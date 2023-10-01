import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Empty } from "antd";
import { find } from "lodash";
import { messagesApi } from "../utils/api";
import { messagesActions, userActions, embeddedMessageActions } from '../redux/actions'
import socket from "../core/socket";
import { Messages as BaseMessages } from "../components";
import Item from "antd/es/list/Item";
const MemoizedBaseMessages = React.memo(BaseMessages);

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
  filter,
  setEmbeddedMessage,
  lang
}) => {

  const [previewImage, setPreviewImage] = useState(null);
  const [blockHeight, setBlockHeight] = useState(18.067);
  const [heightWindowSize, setHeightWindowSize] = useState(18.067);
  const [inputHeight, setInputHeight] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messageLength, setMessageLength] = useState(10);
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
  let Input = document.querySelector('.chat-input textarea');
  useEffect(() => {
    const reSizeInput = (e) => {
      if (e.target.clientHeight === 36) {
        setInputHeight(0)
      } else {
        setInputHeight((+e.target.clientHeight / window.innerWidth) * 100 + 4)
      }

    }
    if (Input) {
      Input.addEventListener('focus', reSizeInput)
      Input.addEventListener('blur', reSizeInput)
      Input.addEventListener('keydown', reSizeInput)
    }

    return (() => {
      if (Input) {
        Input.removeEventListener('focus', reSizeInput)
        Input.removeEventListener('blur', reSizeInput)
        Input.removeEventListener('keydown', reSizeInput)
      }
    })
  }, [Input])
  useEffect(() => {
    socket.on('DIALOGS:TYPING', toggleIsTyping);
    setMessageLength(Item.length)
  }, []);
  useEffect(() => {
    const heightWindowSizeFunc = () => {
      setHeightWindowSize(window.innerWidth/ 100);
    }
    window.onresize = () => heightWindowSizeFunc()
    heightWindowSizeFunc()
  }, [items.length, attachments, window.innerWidth]);
  useEffect(() => {
    if (attachments.length) {
      if(window.innerWidth < 1200){
        setBlockHeight(heightWindowSize + inputHeight + ((window.innerHeight / 100)) + 12)  ;
      }else{
        setBlockHeight(heightWindowSize + inputHeight + ((window.innerHeight / 200)) + 12)  ;
      }
    } else {

        if(window.innerWidth < 1200){
          setBlockHeight(heightWindowSize  + inputHeight + ((window.innerHeight / window.innerHeight) - 11 ))  ;
        }else{
          setBlockHeight(heightWindowSize + inputHeight + ((window.innerHeight / 200)))  ;
        }
    }
  }, [items.length, attachments, inputHeight, heightWindowSize]);

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }
    socket.on('SERVER:NEW_MESSAGE', onNewMessage);

    return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
  }, [currentDialog]);


  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollBy(0, messagesRef.current.scrollHeight);
    }
  }, [total, isTyping, filter]);
  useEffect(() => {
    if (items) {
      if (filter) {
        messagesApi.findMessages(currentDialog._id, filter).then((message) => {
          setFilteredItem(message.data)
          setLoadingNewMessage(false)
        }).catch(() => {
          setFilteredItem(items)
        })
      } else {
        setFilteredItem(items)
      }
    }
  }, [filter])

  const handleLoadNewMessage = (e, messageLength = 15, currentDialog, items) => {
    if (filter.trim() === '') {
      if (e.target.scrollTop === 0) {
        if (messageLength > 0) {
          if ((messageLength < total) && !loadingNewMessage) {
            setLoadingNewMessage(true)
            messagesApi.getAllByDialogId(currentDialog._id, messageLength).then((data) => {
              if (items[0] || items && data.data.messages > 0) {
                if (items[0]._id !== data.data.messages[0]._id) {
                  additionalLoadingMessage(data.data.messages)
                  setMessageLength(data.data.messages.length + messageLength)
                  setLoadingNewMessage(false)
                  e.target.scrollBy(0, 50);
                }
              }
            })
          }
        }
      }
    }
  }
  const addEmbeddedMessage = (item) => {
    setEmbeddedMessage({})
    setEmbeddedMessage(item)
  }
  const toggleSidebarPartnerFunc = () => {
    toggleSidebarPartner(!SidebarPartner)
  }

  if (!currentDialog) {
    return <Empty description="Откройте диалог" />;
  }
  const scrollByElemnt = (id) => {
    if (id) {
      let elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView(false)
        elem.classList.add('focus-message')
        if (elem.classList.contains('focus-message')) {
          const time = setTimeout(() => {
            elem.classList.remove('focus-message')
            clearTimeout(time)
          }, 600);
        }
        else {
          scrollByElemnt(scrollByElemnt(id))
        }

      } else {
        if (messagesRef) {
          messagesRef.current.scrollTo(0, messagesRef.scrollHeight);
          messagesApi.getAllByDialogId(currentDialog._id, messageLength).then((data) => {
            if (items[0] || items && data.data.messages > 0) {
              if (items[0]._id !== data.data.messages[0]._id) {
                additionalLoadingMessage(data.data.messages)
                setMessageLength(data.data.messages.length + messageLength)
                setLoadingNewMessage(false)

              }
            }
            scrollByElemnt(id)
          })
        }
      }
    }
  }

  return (
    <MemoizedBaseMessages
      user={user}
      blockRef={messagesRef}
      items={filter.trim() !== '' ? filteredItem : items}
      isLoading={isLoading && !user}
      onRemoveMessage={removeMessageById}
      scrollByElemnt={scrollByElemnt}
      messageLength={messageLength}
      currentDialog={currentDialog}
      setPreviewImage={setPreviewImage}
      previewImage={previewImage}
      blockHeight={blockHeight}
      isTyping={isTyping}
      lang={lang}
      partner={
        user._id !== currentDialog.partner._id ? currentDialog.author : currentDialog.partner
      }
      handleLoadNewMessage={handleLoadNewMessage}
      loadingNewMessage={loadingNewMessage}
      toggleSidebarPartnerFunc={toggleSidebarPartnerFunc}
      addEmbeddedMessage={addEmbeddedMessage}
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
    SidebarPartner: user.SidebarPartner,
    lang: user.lang
  }),
  { ...messagesActions, ...userActions, ...embeddedMessageActions }
)(Dialogs);