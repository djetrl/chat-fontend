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
  setLang: theme =>dispatch=> {
    dispatch({
      type: "USER:SET_OPTION_LANG_SET",
      payload: theme
    })
},
  toggleSidebarPartner: bool=>dispatch=> {
    dispatch({
      type: "USER:SET_OPTION_SIDEBARPARTNER_TOGGLE",
      payload: bool
    })
},
toggleSidebar: bool=>dispatch=> {
  dispatch({
    type: "USER:SET_OPTION_SIDEBAR_TOGGLE",
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
         window.location.replace("/sigin");
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
    }).catch((err)=>{

      if(err.response.data.message === "account not verified"){
        openNotification({
          title: "Ошибка при авторизации",
          text: "ваш аккаунт не подтверждён. перейдите по ссылке в письме, которое было отправлено вам на почту",
          type: "error"
        });
      }else{
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error"
        });
      }
    });
  },

  fetchRecoverPassword: postData => dispatch => {
    return userApi.recoverPassword(postData).then((data) => {
        openNotification({
          title: "Отлично!",
          text: "Новый пароль отправлен на почту.",
          duration:0,
          type: "success"
        });
        localStorage.removeItem('token');
        // dispatch(Actions.fetchRecoverPassword());
        dispatch(Actions.setIsAuth(true))
      return data ;
    }).catch(()=>{
        openNotification({
          title: "Ошибка при восстановление",
          text: "Не найдин аккаунт с такие E-Mail адресс",
          type: "error"
        });
    });
  },
  fetchUserRegister: postData => dispatch => {
    return userApi.signUp(postData)
  }
};

export default Actions;