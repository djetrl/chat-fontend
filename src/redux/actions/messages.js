import { messagesApi } from "../../utils/api";


const Actions = {
  setMessages: items=> ({
    type:'MESSAGES:SET_ITEMS',
    payload:items 
  }),
  addMessage: message=> (dispatch, getState)=>{
    const {dialogs} = getState();
    const {currentDialogId} = dialogs;
    if(currentDialogId === message.dialog._id){
      dispatch({
        type:'MESSAGES:ADD_MESSAGE',
        payload:message 
      })
    }
  },
  additionalLoadingMessage:messages=>dispatch=>{
    dispatch({
      type:"MESSAGES:ADDIITIONAL_LOADING",
      payload:messages
    })
  },
  setIsLoading: bool=> ({
    type:'MESSAGES:SET_IS_LOADING',
    payload:bool 
  }),
  fetchSendMessage: ({text, dialogId, attachments,embeddedMessage})=>dispatch=>{
    return  messagesApi.send(text,dialogId,attachments,embeddedMessage)

  },
  setFilter:filter=>dispatch=>{
    dispatch({
      type:"MESSAGES:SET_FILTER",
      payload:filter
    })
  },
  removeMessageById:(id)=>dispatch=>{
    
    if(window.confirm('Вы действительно хотите удалить сообщение?')){
      messagesApi
      .removeById(id)
      .then(({ data }) => {
        dispatch({
          type:'MESSAGES:REMOVE_MESSAGE',
          payload:id 
        });
      }).catch(()=>{
        dispatch(Actions.setIsLoading(false))
      })
  
    }
  },
  fetchMessages: (dialogId)=>dispatch=>{
    dispatch(Actions.setIsLoading(true))
    messagesApi
    .getAllByDialogId(dialogId)
    .then(({ data }) => {
      dispatch(Actions.setMessages(data));
    }).catch(()=>{
      dispatch(Actions.setIsLoading(false))
    })

  }
}

export default Actions