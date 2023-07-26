 import {IconReaded, Avatar} from '..'
 import classNames from 'classnames';
 import format from 'date-fns/format';
 import isToday from 'date-fns/isToday';
 import { Link } from 'react-router-dom';

const getMessageTime = createdAt =>{
  if(isToday(new Date(createdAt))){
    return format(
      new Date(createdAt),
      "HH:mm"
    )
  }else{
    return format(
      new Date(createdAt),
      "dd.MM.yyyy"
    )
  }}
  
const renderLastMessage = (message, userId)=>{
  let text ='';
  if(!message.text && message.attachments.length){
    text = "прикрепленный файл"
  }else{
    text = message.text;
  }
   return `${message.user._id === userId ? 'Вы: ' : ''}${text}`
  
}
const DialogItem= ({
          _id,
          user,
          text,
          created_at, 
          undread, 
          isMe, 
          partner,
          currentDialogId,
          lastMessage,
          userId})=>(
<Link to={`/dialog/${_id}`}>
  <div 
        className={classNames("dialogs__item", {
          'dialogs__item--online':partner.isOnline,
          'dialogs__item--selected':currentDialogId === _id
        })}>
    <div className="dialogs__item-avatar">
      <Avatar user={partner}/>
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{partner.fullname}</b> 
        <span>{getMessageTime(lastMessage.updatedAt)}</span>
      </div> 
      <div className="dialogs__item-info-bottom">
        <p>{renderLastMessage(lastMessage, userId)}</p>
        {isMe && <IconReaded isMe={isMe} isReaded={lastMessage.readed}/>}
        {lastMessage.undread>0 && <div className="dialogs__item-info-bottom-count">{lastMessage.undread > 9 ? '+9': lastMessage.undread}</div>}
      </div>
    </div>
  </div>
  </Link>
)

export default DialogItem;