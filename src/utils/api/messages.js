import {axios} from "../../core";


export default {
  getAllByDialogId: (id, skip=0 )=> axios.get(`/messages?dialog=${id}&skip=${skip}`),
  removeById: id =>axios.delete("/messages?id="+id),
  send: (text,dialogId,attachments)=> axios.post("/messages",{
    "text":text,
    "dialog_id":dialogId,
    attachments
  }),
}