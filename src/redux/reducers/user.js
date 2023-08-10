const initialState = {
  data: null,
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  theme:window.localStorage.theme?window.localStorage.theme:window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark',
  SidebarPartner:false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER:SET_DATA":
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: window.localStorage.token
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: payload
      };
      case "USER:SET_OPTION_THEME_SET":
        window.localStorage.setItem('theme',payload);
        return {
          ...state,
          theme: payload,
        };
        case "USER:SET_OPTION_SIDEBARPARTNER_TOGGLE":
          return {
            ...state,
            SidebarPartner: payload,
          };
    default:
      return state;
  }
  
};