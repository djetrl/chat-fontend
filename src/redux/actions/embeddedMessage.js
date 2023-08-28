
const Actions = {
  setEmbeddedMessage: items=> ({
    type:'EMBEDDEDMESSAGE:SET_ITEMS',
    payload:items
  }),
  removeEmbeddedMessage: ()=> ({
    type:'EMBEDDEDMESSAGE:REMOVE_ITEM'
  }),

  
}

export default  Actions