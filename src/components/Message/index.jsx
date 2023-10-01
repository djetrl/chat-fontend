import PropsType from 'prop-types';
import classNames from 'classnames';
import data from '@emoji-mart/data';
import { init } from 'emoji-mart'
import { Popover, Button } from 'antd'
import { EllipsisOutlined, EyeOutlined, DownloadOutlined, TranslationOutlined,LoadingOutlined } from '@ant-design/icons';
import reactStringReplace from 'react-string-replace';
import { useState, useRef, useEffect, } from 'react';
import { IconReaded, Avatar, Video } from '../';
import { convertCurrentTime, isAudio } from '../../utils/helpers';
import waveSvg from '../../assets/img/wave.svg';
import playSvg from '../../assets/img/play.svg';
import pauseSvg from '../../assets/img/pause.svg';
import { formBytes, getMessageTime, onTranslateText, openNotification } from '../../utils/helpers';
import './Message.scss';

const MessageAudio = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElem = useRef(null);
  const togglePlay = () => {
    if (!isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }
  useEffect(() => {
    audioElem.current.volume = '0.1';
    audioElem.current.addEventListener('playing', () => {
      setIsPlaying(true)
    }, false)
    audioElem.current.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }, false)
    audioElem.current.addEventListener('pause', () => {
      setIsPlaying(false)
    }, false)
    audioElem.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioElem.current && audioElem.current.currentTime);
      const duration = audioElem.current && audioElem.current.duration || 0;
      setProgress(audioElem.current && ((audioElem.current.currentTime / duration) * 100))
    })

  }, [])
  return (
    <div className='message__audio'>
      <audio ref={audioElem} src={audioSrc} preload="auto" />
      <div className="message__audio-progress" style={{ width: progress + '%' }}> </div>
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button onClick={togglePlay}>{isPlaying ? <img src={pauseSvg} alt="Pause svg" /> : <img src={playSvg} alt="Play svg" />}</button>
        </div>
        <div className="message__audio-wave"><img src={waveSvg} alt="Wave svg" /></div>
        <span className="message__audio-duration">
          {convertCurrentTime(currentTime)}
        </span>
      </div>
    </div>
  )
}
const MessageFile = ({ item }) => {
  return (
    <div className='message__file'>
      <div className="message__file-header">
        <div className="message__file-header-item">
          <div>
            <p>{item.filename}</p>
            <span>{item.url.split('.')[1]}</span>
          </div>
          <p className='date'>{getMessageTime(item.createdAt)}</p>
        </div>
        <div className="message__file-header-item">
          <p className='message__file-header-size'>{formBytes(item.size)}</p>
        </div>
      </div>
      <div className="message__file-bottom">
        <a href={item.url}>Download</a>
      </div>
    </div>
  )
}

const Message = ({ user, text, scrollByElemnt, isMe, createdAt, readed, lang, addEmbeddedMessage, embeddedMessage, attachments, isTyping, onRemoveMessage, setPreviewImage, toggleSidebarPartnerFunc, _id }) => {
  init({ data })
  const [translateText, setTranslateText] = useState('');
  const [loadTranslateText, setLoadTranslateText] = useState(false);
  const renderAttachment = (item) => {
    if (item.ext !== 'application/octet-stream' && item.ext.split('/')[0] === 'image') {
      return (
        <div key={item._id} onClick={() => setPreviewImage(item.url)} className="message__attachments-item">
          <div className="message__attachments-item-overlay">
            <EyeOutlined style={{ color: 'white', fontSize: 18 }} />
          </div>

          <img src={item.url} alt={item.filename} />
        </div>
      )
    } else if (item.ext === 'application/octet-stream' && item.url.split('.')[1] === 'webm') {
      return <MessageAudio key={item._id} audioSrc={item.url} />
    } else if (item.ext.split('/')[0] === 'video') {
      return (
        <div key={item._id} className="message__attachments-item">
          <Video data={item} />
        </div>
      )
    }
    else {
      return <MessageFile key={item._id} item={item} />
    }
  }

  const renderEmbeddedMessage = (embeddedMessageItem) => {
    if (embeddedMessageItem) {
      return (
        <div className="embeddedMessage" onClick={() => { scrollByElemnt(embeddedMessageItem._id) }}>
          {embeddedMessageItem.attachments[0] && (
            embeddedMessageItem.attachments[0].ext.split('/')[0] === 'image' ?
              <img src={embeddedMessageItem.attachments[0].url} alt={embeddedMessageItem.attachments[0].fullname} /> :
              embeddedMessageItem.attachments[0].ext.split('/')[0] === 'video' ? (
                <video width={'100%'} height="100%" >
                  <source src={embeddedMessageItem.attachments[0].url} type={embeddedMessageItem.attachments[0].ext} />
                  <source src={embeddedMessageItem.attachments[0].url} type="video/mov" />
                  <source src={embeddedMessageItem.attachments[0].url} type="video/webm" />
                  Тег video не поддерживается вашим браузером.
                </video>
              ) : (
                <a className="File-Icon" href={embeddedMessageItem.attachments[0].url}>
                  <p>{embeddedMessageItem.attachments[0].url.split('.')[1]}</p>
                  <Button type='link' shape='circle' icon={<DownloadOutlined />} />
                </a>
              )
          )}
          <div className="embeddedMessage-info">

            <p>{embeddedMessageItem.user.fullname}</p>
            {embeddedMessageItem.text ? (
              <p className='message__text'>
                {reactStringReplace(embeddedMessageItem.text, /:(.+?):/g, (match, i) =>
                  <em-emoji key={i} shortcodes={":" + match + ":"} set={'apple'} size={16}></em-emoji>
                )}
              </p>)
              : (
                !embeddedMessageItem.text && embeddedMessageItem.attachments[0].ext.split('/')[0] === 'image' ? 'Фото' :
                  embeddedMessageItem.attachments[0].ext.split('/')[0] === 'video' ? 'Видео' : "файл"
              )
            }
          </div>

        </div>
      )
    }
  }
  return (
    <div id={_id} className={classNames('message', {
      'message--isMe': isMe,
      'message--is-typing': isTyping,
      'message--image': !isAudio(attachments) && attachments && attachments.length === 1 && !text,
      'message--is-audio': isAudio(attachments),
    })}>
      <div className="message__content" >
        <IconReaded isMe={isMe} isReaded={readed} />
        <Popover content={<div className='actionMessage'>
          <Button onClick={onRemoveMessage}>удалить сообщение</Button>
          <Button onClick={addEmbeddedMessage}>Ответить</Button>
          <Button onClick={() => {
                                if (!translateText) {
                                  setLoadTranslateText(true)
                                  onTranslateText(text, lang).then(data => {
                                    if (data) {
                                      setTranslateText(data[0].translations[0].text)
                                    }
                                  }).catch(err => {
                                    setTranslateText('')
                                    openNotification({
                                      title: "Ошибка сервера",
                                      text: "попробуйте позже",
                                      type: "error"
                                    });
                                  })
                                  .finally(()=>{
                                    setLoadTranslateText(false)
                                  })
                                } else {
                                  setTranslateText('')
                                }
                              }}> {!loadTranslateText ? <TranslationOutlined /> : <LoadingOutlined/>}  {!translateText  ?  'перевод текста' : 'оригинальный текст'}</Button>
        </div>
        } title={null} trigger={"click"}>
          <div className="message__icon-actions">
            <Button type='link' shape='circle' icon={<EllipsisOutlined />} />
          </div>
        </Popover>
        <div className="message__avatar" onClick={toggleSidebarPartnerFunc} >
          <Avatar user={user} />
        </div>
        <div className="message__info" style={{"display": (attachments.length >= 5 && text) ? ('block') : ('flex')}}>
          {(text || isTyping) &&
            <div className="message__bubble">
              {embeddedMessage && (

                embeddedMessage.length > 0 && renderEmbeddedMessage(embeddedMessage[0])

              )}

              {translateText && text ? (
                <p className='message__text'>
                  {
                    reactStringReplace(translateText, /:(.+?):/g, (match, i) => {
                      return <em-emoji key={i} shortcodes={":" + match + ":"} set={'apple'} size={16}></em-emoji>
                    })

                  }

                </p>
              ) : (
                <p className='message__text'>
                  {
                    reactStringReplace(text, /:(.+?):/g, (match, i) => {
                      return <em-emoji key={i} shortcodes={":" + match + ":"} set={'apple'} size={16}></em-emoji>
                    })

                  }

                </p>
              )
              }
              {isTyping && (
                <div className="message__typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {attachments && attachments[0] && attachments[0].ext.split('/')[0] !== 'image' && text && (
                <div className={classNames("message__attachments", {
                  "message-attachments-many": attachments.length > 1,
                  "message-attachments-many-file": attachments.length > 1 && attachments[0].ext.split('/')[0] !== 'image' && attachments[0].ext.split('/')[0] !== 'video'
                })}  >
                  {attachments.map((item) => (renderAttachment(item)))}
                </div>
              )}
            </div>
          }
          {(createdAt) && <span className="message__date">{getMessageTime(createdAt)}</span>}
          {(attachments && attachments[0] && (attachments[0].ext.split('/')[0] === 'image' && text) || !text) && (
            <div className={classNames("message__attachments", {
              "message-attachments-many": (attachments && attachments.length) > 1,
              "message-attachments-many-file": (attachments && attachments.length) > 1 && attachments[0].ext.split('/')[0] !== 'image' && attachments[0].ext.split('/')[0] !== 'video'
            })}  >
              {attachments && attachments.map((item) => (renderAttachment(item)))}
            </div>
          )}
        </div>
      </div>
    </div>

  )
}
Message.defaultProps = {
  user: {}
}
Message.prototype = {
  avatar: PropsType.string,
  text: PropsType.string,
  data: PropsType.string,
  user: PropsType.object,
  attachments: PropsType.array,
  isTyping: PropsType.bool,
  isMe: PropsType.bool,
  isReaded: PropsType.bool,
  audio: PropsType.string
}
export default Message