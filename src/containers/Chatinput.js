import { useState,useEffect } from 'react';
import { filesApi } from '../utils/api';
import { connect } from "react-redux";
import socket from '../core/socket';

import { Chatinput as ChatInputBase } from "../components";

import { attachmentsActions, messagesActions } from "../redux/actions";

const ChatInput = props => {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };
  useEffect(() => {
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener('click', handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener('click', handleOutsideClick.bind(this, el));
    };
  }, []);
  const {
    dialogs: { currentDialogId },
    attachments,
    fetchSendMessage,
    setAttachments,
    removeAttachment,
    user,
  } = props;

  if (!currentDialogId) {
    return null;
  }

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;


  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = stream => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = e => {
      const file = new File([e.data], 'audio.webm');
      setLoading(true);
      filesApi.upload(file).then(({ data }) => {
        sendAudio(data.file._id).then(() => {
          setLoading(false);
        });
      });
    };
  };

  const onError = err => {
    console.log('The following error occured: ' + err);
  };


  const addEmoji = ({shortcodes}) => {
    setValue((value + ' ' + shortcodes).trim());
  };

  const sendAudio = audioId => {
    return fetchSendMessage({
      text: null,
      dialogId: currentDialogId,
      attachments: [audioId],
    });
  };

  const sendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if ((value && value.trim() !== '') || attachments.length !== 0 ) {
      fetchSendMessage({
        text:value.trim() !=='' ? value: null,
        dialogId: currentDialogId,
        attachments: attachments.map(file => file.uid),
      });
      setValue('');
      setAttachments([]);
    }
  };

  const handleSendMessage = e => {
    
      if(value.trim() !==''){
        socket.emit('DIALOGS:TYPING', { dialogId: currentDialogId, user });
      }
      if (e.which == 13) {
        setValue('')
      }
      if (e.keyCode === 13) {
        e.preventDefault();
        sendMessage();
      }
  };

  const onHideRecording = () => {
    setIsRecording(false);
  };

  const onSelectFiles = async files => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: 'uploading',
        },
      ];
      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }) => {
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
    }
    setAttachments(uploaded);
  };


  return (
    <ChatInputBase
      value={value}
      setValue={setValue}
      emojiPickerVisible={emojiPickerVisible}
      toggleEmojiPicker={toggleEmojiPicker}
      addEmoji={addEmoji}
      handleSendMessage={handleSendMessage}
      sendMessage={sendMessage}
      onSelectFiles={onSelectFiles}
      attachments={attachments}
      isRecording={isRecording}
      onRecord={onRecord}
      onHideRecording={onHideRecording}
      isLoading={isLoading}
      removeAttachment={removeAttachment}
    />
  );
};
export default connect(
                        ({dialogs, attachments, user})=>({
                          dialogs, 
                          attachments: attachments.items, 
                          user:user.data
                        }) , 
                        {...messagesActions, ...attachmentsActions} )
                        (ChatInput);
// TODO: После отправленния одного сообщеня с фото после этого  до перезагрузки страницы  нельзя больше отправить фото исправить