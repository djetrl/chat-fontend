import { openNotification } from "../../utils/helpers";
import { userApi } from "../../utils/api";


const Actions = {
  setUserData: data => ({
    type: "USER:SET_DATA",
    payload: data
  }),
  setTheme: theme =>dispatch=> {
      dispatch({
        type: "USER:SET_OPTION_THEME_SET",
        payload: theme
      })
  },
  toggleSidebarPartner: bool=>dispatch=> {
    dispatch({
      type: "USER:SET_OPTION_SIDEBARPARTNER_TOGGLE",
      payload: bool
    })
},
  setIsAuth: bool => ({
    type: "USER:SET_IS_AUTH",
    payload: bool
  }),
  updateData: data => dispatch=>{
    dispatch(Actions.setUserData(data));
  },
  fetchUserData: () => dispatch => {
    userApi.getMe().then(({ data }) => {
      dispatch(Actions.setUserData(data));
    }).catch(err=>{
      if(err.response.status === 403 && err.response.status === 404){
         dispatch(Actions.setIsAuth(false));
         delete window.localStorage.token;
      }
    })
  },
  fetchUserLogin: postData => dispatch => {
    return userApi.signIn(postData).then(({ data }) => {
      const {  token } = data;
        openNotification({
          title: "Отлично!",
          text: "Авторизация успешна.",
          type: "success"
        });
        window.axios.defaults.headers.common["token"] = token;
        window.localStorage["token"] = token;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true))
      return data;
    }).catch(()=>{
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error"
        });
    });
  },
  fetchUserRegister: postData => dispatch => {
    return userApi.signUp(postData)
  }
};

export default Actions;