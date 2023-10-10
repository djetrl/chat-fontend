  import { getCookie } from "../../utils/helpers";
const initialState = {
  data: null,
  token: getCookie('acsTKn'),
  isAuth: !!getCookie('refTKn'),
  theme: window.localStorage.theme ? window.localStorage.theme : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
  lang: window.localStorage.lang ?  window.localStorage.lang : window.navigator ? (window.navigator.language.split('-')[0] || window.navigator.systemLanguage.split('-')[0] ||window.navigator.userLanguage.split('-')[0]) : "ru",
  SidebarPartner: false,
  Sidebar: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER:SET_DATA":
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: getCookie('acsTKn'),
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: payload
      };
    case "USER:SET_OPTION_THEME_SET":
      window.localStorage.setItem('theme', payload);
      return {
        ...state,
        theme: payload,
      };
      case "USER:SET_OPTION_LANG_SET":
        window.localStorage.setItem('lang', payload);
        return {
          ...state,
          lang: payload,
        };
    case "USER:SET_OPTION_SIDEBARPARTNER_TOGGLE":
      return {
        ...state,
        SidebarPartner: payload,
      };
      case "USER:SET_OPTION_SIDEBAR_TOGGLE":
        return {
          ...state,
          Sidebar: payload,
        };
    default:
      return state;
  }

};