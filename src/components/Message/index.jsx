import PropsType from 'prop-types';
import classNames from 'classnames';
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import  {Popover, Button } from 'antd'
import {EllipsisOutlined,EyeOutlined } from '@ant-design/icons';
import reactStringReplace from 'react-string-replace';
import { useState, useRef, useEffect } from 'react';
import {Time, IconReaded,Avatar} from '../';
import { convertCurrentTime , isAudio} from '../../utils/helpers';
import waveSvg from '../../assets/img/wave.svg';
import playSvg from '../../assets/img/play.svg';
import pauseSvg from '../../assets/img/pause.svg';
import {formBytes} from '../../utils/helpers';
import './Message.scss';


const MessageAudio = ({audioSrc})=>{
  const [isPlaying, setIsPlaying ] = useState(false);
  const [progress, setProgress ] = useState(0);
  const [currentTime, setCurrentTime ] = useState(0);
  const  audioElem =useRef(null);
  const togglePlay = ()=>{
      if(!isPlaying){
        audioElem.current.play();
      }else{
        audioElem.current.pause();
      }
    }
 useEffect(()=>{
  audioElem.current.volume='0.1';
  audioElem.current.addEventListener('playing', ()=>{
    setIsPlaying(true)
  },false)
  audioElem.current.addEventListener('ended', ()=>{
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  },false)
  audioElem.current.addEventListener('pause', ()=>{
    setIsPlaying(false)
  },false)
  audioElem.current.addEventListener('timeupdate', ()=>{
    setCurrentTime(audioElem.current.currentTime);
    const duration = audioElem && audioElem.current.duration || 0;
    setProgress((audioElem.current.currentTime/duration)*100)
  })
 },[])
  return(
  <div className='message__audio'>
    <audio ref={audioElem} src={audioSrc} preload="auto"/>
    <div className="message__audio-progress" style={{width: progress + '%'}}> </div>
    <div className="message__audio-info">
      <div className="message__audio-btn">
        <button onClick={togglePlay}>{isPlaying ? <img src={pauseSvg} alt="Pause svg" /> : <img src={playSvg} alt="Play svg" /> }</button>
      </div>
      <div className="message__audio-wave"><img src={waveSvg} alt="Wave svg" /></div>
      <span className="message__audio-duration">
        {convertCurrentTime(currentTime)}
      </span>
    </div>
  </div>
  )
}
const MessageFile= ({item})=>{
  return(
    <div className='message__file'>
      <div className="message__file-header">
        <div className="message__file-header-item">
          <div>
            <p>{item.filename}</p>
            <span>{item.url.split('.')[1]}</span>
          </div>
          <p className='date'>{item.updatedAt.split("T")[1].split(/\b(\d{2}:\d{2})\b/)[1]}</p>
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

const Message= ({user, text, date, isMe, readed, attachments,isTyping,onRemoveMessage,setPreviewImage,toggleSidebarPartnerFunc})=>{
  init({ data })
  const renderAttachment = (item)=>{
    if(item.ext !== 'application/octet-stream' && item.ext.split('/')[0] === 'image' ){
      return (
        <div key={item._id} onClick={()=>setPreviewImage(item.url)} className="message__attachments-item">
        <div className="message__attachments-item-overlay">
          <EyeOutlined style={{color:'white', fontSize:18}} />
          </div>
        
        <img src={item.url}  alt={item.filename} />
      </div>  
      )
    }else if(item.ext === 'application/octet-stream'){
      return <MessageAudio key={item._id} audioSrc={item.url}/>    
    }else if(item.ext.split('/')[0] === 'video' ){
      return(
     <div key={item._id} className="message__attachments-item">
        <video width={'100%'}  height="100%" style={{'borderRadius':"10px"}} controls="controls">
            <source src={item.url} type={`${item.ext}; codecs="vp8, vorbis"`}/>
            Тег video не поддерживается вашим браузером. 
        </video>
      </div>  
      )
    }
    else{
      return <MessageFile key={item._id} item={item}/>
    }
  }
  
  return(
    <div className={classNames('message',{
      'message--isMe':isMe, 
      'message--is-typing':isTyping,
      'message--image': !isAudio(attachments) && attachments && attachments.length === 1 && !text ,
      'message--is-audio': isAudio(attachments),
      })}>
      <div className="message__content">
        <IconReaded isMe={isMe} isReaded={readed}/>
        <Popover content={<div> <Button onClick={onRemoveMessage}>удалить сообщение</Button></div>} title={null} trigger={"click"}>
          <div className="message__icon-actions">
          <Button type='link' shape='circle' icon={<EllipsisOutlined />}/>
          </div>
        </Popover>
        <div className="message__avatar" onClick={toggleSidebarPartnerFunc} >
          <Avatar user={user} />
        </div>
        <div className="message__info">
            {(text || isTyping) &&  
                   <div className="message__bubble">
                   {text && 
                   <p className='message__text'>
                      {
                        reactStringReplace(text, /:(.+?):/g,  (match, i)=>{
                           return <em-emoji key={i} shortcodes={":"+match+":"}  set={'apple'} size={16}></em-emoji>
                        })
                      }
                    </p>
                    }
                   {isTyping && (
                        <div className="message__typing">
                           <span></span>
                           <span></span>
                           <span></span>
                        </div>
                   )}
                  </div>
            }
            
              {attachments && (
                    <div className="message__attachments">  
                       {attachments.map((item)=>(renderAttachment(item)))}
                    </div>        
              )}
       
          {date && <span className="message__date"><Time date={date}/></span>}
        </div>
        </div>
    </div>

  )
}
Message.defaultProps ={
  user:{}
}
Message.prototype={
  avatar:PropsType.string,
  text:PropsType.string,
  data:PropsType.string,
  user:PropsType.object,
  attachments:PropsType.array,
  isTyping: PropsType.bool,
  isMe: PropsType.bool,
  isReaded:PropsType.bool,
  audio: PropsType.string
}
export default Message