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
      items: []
    }
    default:
      return state;
};
};