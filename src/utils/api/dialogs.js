import {axios} from "../../core";


export default {
  getAll: ()=> axios.get('/dialogs'),
  create: ({partner,text})=> axios.post('/dialogs', {partner,text}),
  createGroup: ({partner,text, name, avatar})=> axios.post('/dialogs/group', {partner,text, name, avatar}),
  update: ({name, avatar,_id})=> axios.patch("/dialogs", {name, avatar, _id}),
  addUserGroup: ({partner,dialog})=> axios.post('/dialogs/addUserGroup', {partner,dialog}),
  deletePartnerForGroup: ({partner,dialog})=> axios.post('/dialogs/deletePartnerForGroup', {partner,dialog}),
  delete: (id)=>axios.delete(`/dialogs/${id}`)
}