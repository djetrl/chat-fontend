import PropsType from 'prop-types';
import { SmileOutlined, FileOutlined, AudioOutlined, CheckCircleOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { UploadField } from '../../utils/helpers';
import { UploadFiles } from '../'

import './Chatinput.scss';

const { TextArea } = Input;

const Chatinput = (props) => {
  const { setValue,
    emojiPickerVisible,
    value,
    toggleEmojiPicker,
    handleSendMessage,
    addEmoji,
    onSelectFiles,
    attachments,
    isRecording,
    onRecord,
    onHideRecording,
    sendMessage,
    isLoading,
    removeAttachment,
    theme,
    embeddedMessage,
    removeEmbeddedMessage
  } = props;
  return (
    <div className="chat-input">
      <div>
        <div className="chat-input__smile-btn">
          <div className="chat-input__emoji-picker">
            {emojiPickerVisible &&
              <Picker theme={theme} data={data} onEmojiSelect={addEmoji} />
            }
          </div>
          <Button onClick={toggleEmojiPicker} type='link' shape='circle' icon={<SmileOutlined />} />
        </div>
        {isRecording ?
          <div className='chat-input__record-status'>
            <i className='chat-input__record-status-bubble'></i>
            Recording...
            <Button onClick={onHideRecording} type='link' shape='circle' icon={<CloseOutlined />} className='stop-recording' />
          </div> : (
            <div className='chat-input-textArea-container'>
              {embeddedMessage._id && (
                <div className="chat-input-embeddedMessage">
                  <div className="chat-input-embeddedMessage-info">
                    <span>{embeddedMessage && embeddedMessage.user.fullname}</span>
                    <p>
                      {
                        embeddedMessage && embeddedMessage.text ? embeddedMessage.text :
                          embeddedMessage.attachments[0].ext.split('/')[0] === 'image' ? 'Фото' :
                            embeddedMessage.attachments[0].ext.split('/')[0] === 'video' ? 'Видео' : "файл"
                      }
                    </p>
                  </div>
                  <Button type='link' shape='circle' icon={<CloseOutlined />} onClick={removeEmbeddedMessage} />
                </div>
              )}
              <TextArea
                onChange={e => setValue(e.target.value)}
                onKeyUp={handleSendMessage}
                size='large'
                placeholder="Введите текст сообщения..."
                value={value}
                autoSize={{ minRows: 1, maxRows: 5 }}
                cols={1}
              />
            </div>
          )}

        <div className="chat-input__actions">

          <UploadField
            onFiles={onSelectFiles}
            containerProps={{
              className: 'chat-input_actions-upload'
            }}
            uploadProps={{
              multiple: 'multiple'
            }}>
            <Button type='link' shape='circle' name='btnFile' icon={<FileOutlined />} />
          </UploadField >

          {isLoading ? (
            <Button type='link' shape='circle' icon={<LoadingOutlined />} />
          ) : isRecording || value || attachments.length ? (
            <Button onClick={sendMessage} type='link' name='sendTextBtn' shape='circle' icon={<CheckCircleOutlined />} />
          ) : (
            <div className="chat-input__record-btn">
              <Button type='link' onClick={onRecord} shape='circle' name='audioBtn' icon={<AudioOutlined />} />
            </div>
          )

          }
        </div>
      </div>
      {attachments.length > 0 && (<div className='chat-input__attachments'>  <UploadFiles removeAttachment={removeAttachment} attachments={attachments} /></div>)}
    </div>
  )
}
Chatinput.prototype = {
  className: PropsType.string
}
export default Chatinput