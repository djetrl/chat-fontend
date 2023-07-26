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


const Message= ({avatar,user, text, date, isMe, readed, attachments,isTyping,onRemoveMessage,setPreviewImage})=>{
 
  init({ data })
  const renderAttachment = (item)=>{
    if(item.ext !== 'webm'){
      return (
        <div key={item._id} onClick={()=>setPreviewImage(item.url)} className="message__attachments-item">
        <div className="message__attachments-item-overlay">
          <EyeOutlined style={{color:'white', fontSize:18}} />
          </div>
        
        <img src={item.url}  alt={item.filename} />
      </div>  
      )
    }else{
      return <MessageAudio key={item._id} audioSrc={item.url}/>
    }
  }

  return(
    <div className={classNames('message',{
      'message--isMe':isMe, 
      'message--is-typing':isTyping,
      'message--image': !isAudio(attachments) && attachments && attachments.length === 1 && !text ,
      'message--is-audio': isAudio(attachments)
      })}>
      <div className="message__content">
        <IconReaded isMe={isMe} isReaded={readed}/>
        <Popover content={<div> <Button onClick={onRemoveMessage}>удалить сообщение</Button></div>} title={null} trigger={"click"}>
          <div className="message__icon-actions">
          <Button type='link' shape='circle' icon={<EllipsisOutlined />}/>
          </div>
        </Popover>
        <div className="message__avatar">
          <Avatar user={user}/>
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
                  {false && (
                    <MessageAudio audioSrc={null}/>
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