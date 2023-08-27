const initialState = {
  items:[]
};

export default (state = initialState, { type, payload }) => {
switch (type) {
  case "EMBEDDEDMESSAGE:SET_ITEMS":
    return {
      ...state,
      items: payload
    };
  case "EMBEDDEDMESSAGE:REMOVE_ITEM":
    return {
      ...state, 
      items: state.items.filter(item => item.uid !== payload.uid)
    }
    default:
      return state;
};
};