import {axios} from "../../core";


export default {
  getAllByDialogId: (id, skip=0 )=> axios.get(`/messages?dialog=${id}&skip=${skip}`),
  removeById: id =>axios.delete("/messages?id="+id),
  findMessages: (dialogId,text )=> axios.get(`/messages/find?dialogId=${dialogId}&text=${text}`),
  send: (text,dialogId,attachments,embeddedMessage)=> axios.post("/messages",{
    "text":text,
    "dialog_id":dialogId,
    attachments,
    embeddedMessage
  }),
}