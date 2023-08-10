const initialState={
  items:[],
  isLoading:false,
  total:null,
  filter:'',
}


export default (state = initialState,{type, payload} )=>{
  switch(type){
    case 'MESSAGES:ADD_MESSAGE':
      return{
        ...state,
        isLoading:false,
        items:[...state.items, payload],
      };
      case 'MESSAGES:ADDIITIONAL_LOADING':
        return{
          ...state,
          items:[...payload, ...state.items],       
        };
    case 'MESSAGES:SET_ITEMS':
    return{
      ...state,
      items:payload.messages,
      isLoading:false,
      total:payload.total
    };
    case 'DIALOGS:LAST_MESSAGE_READED_STATUS':
      return {
        ...state,
        items: state.items.map(message => {
          if (message.dialog._id === payload.dialogId) {
            message.readed = true;
          }
          return message;
        }),
      };
    case 'MESSAGES:SET_IS_LOADING':
      return{
        ...state,
        isLoading:payload
      };
      case 'MESSAGES:REMOVE_MESSAGE':
        return{
          ...state,
          items:state.items.filter(message=>message._id !== payload)
        };
      case 'MESSAGES:SET_FILTER':
        return{
          ...state,
          filter:payload,
        };  
    default:
      return state
  }
}