import {dialogsApi} from '../../utils/api';
import socket from '../../core/socket';
const Actions = {
  setDialogs: items=> ({
    type:'DIALOGS:SET_ITEMS',
    payload:items
  }),
  deleteDialogs: id=> ({
    type:'DIALOGS:DELETE_ITEM',
    payload:id
  }),
  updateReadedStatus: ({ userId, dialogId }) => ({
    type: 'DIALOGS:LAST_MESSAGE_READED_STATUS',
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialogId: id=>dispatch =>{
    socket.emit('DIALOG:JOIN',id)
    dispatch({
      type:'DIALOGS:SET_CURRENT_DIALOG_ID',
      payload:id
    })
  },
  fetchDialogs: ()=>dispatch=>{
    dialogsApi.getAll().then(({data})=>{
      dispatch(Actions.setDialogs(data));
    })
  }
  
}

export default  Actions