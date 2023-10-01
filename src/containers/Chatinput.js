import { useState, useEffect } from 'react';
import { filesApi } from '../utils/api';
import { connect } from "react-redux";
import socket from '../core/socket';
import { Chatinput as ChatInputBase } from "../components";
import { attachmentsActions, messagesActions , embeddedMessageActions} from "../redux/actions";

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
    // onStartRecordTranscription()
    props.removeEmbeddedMessage();
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener('click', handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener('click', handleOutsideClick.bind(this, el));
    };
  }, [props.dialogs.currentDialogId]);

  const {
    dialogs: { currentDialogId },
    attachments,
    fetchSendMessage,
    setAttachments,
    removeAttachment,
    user,
    theme,
    embeddedMessage,
    setEmbeddedMessage,
    removeEmbeddedMessage
  } = props;

  if (!currentDialogId || props.dialogs.items.filter(item => item._id === currentDialogId).length === 0) {
    if(currentDialogId){
      window.location.replace("/");
    }
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
    console.err('The following error occured: ' + err);
  };


  const addEmoji = ({ shortcodes }) => {
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
    } else if ((value && value.trim() !== '') || attachments.length !== 0) {
      fetchSendMessage({
        text: value.trim() !== '' ? value : null,
        dialogId: currentDialogId,
        attachments: attachments.map(file => file.uid),
        embeddedMessage: embeddedMessage._id
      });
      setValue('');
      setAttachments([]);
      setEmbeddedMessage({})
    }
  };

  const handleSendMessage = e => {

    if (value.trim() !== '') {
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
    const fileType =files[0].type.split('.')[0];
    for (let i = 0; i < files.length; i++) {
      if (i < 7 && (fileType === files[i].type.split('.')[0])) {
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
      theme={theme}
      embeddedMessage={embeddedMessage}
      removeEmbeddedMessage={removeEmbeddedMessage}
    />
  );
};

export default connect(
  ({ dialogs, attachments, user,embeddedMessage }) => ({
    dialogs,
    attachments: attachments.items,
    user: user.data,
    theme:user.theme,
    embeddedMessage:embeddedMessage.items
  }),
  { ...messagesActions, ...attachmentsActions, ...embeddedMessageActions })
  (ChatInput);
