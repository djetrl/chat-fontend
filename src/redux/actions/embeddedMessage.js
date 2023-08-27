
const Actions = {
  setEmbeddedMessage: items=> ({
    type:'EMBEDDEDMESSAGE:SET_ITEMS',
    payload:items
  }),
  removeEmbeddedMessage: (file)=> ({
    type:'EMBEDDEDMESSAGE:REMOVE_ITEM',
    payload:file
  }),

  
}

export default  Actions