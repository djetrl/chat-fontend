import { withFormik } from "formik";
import get from 'lodash';
import validateForm from "../../../utils/validate";
import RegisterForm from "../components/RegisterForm";
import  {userActions} from "../../../redux/actions";
import { openNotification } from "../../../utils/helpers";

import store from '../../../redux/store'


export default withFormik({
  enableReinitialize:true,
  mapPropsToValues:()=>({
    email:''.toLowerCase(),
    fullname:'',
    password:'',
    password_2:''
  }),
  validate: values => { 
    const errors = {};
    validateForm({isAuth:false, values, errors});
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store.dispatch(userActions.fetchUserRegister(values))
    .then(() => {
      window.location.replace("/signup/verify");
      setSubmitting(false);
    }).catch((err)=>{ 
      if (get(err, 'response.data.message.errmsg', '').__wrapped__.request.response.indexOf('MongoError') >= 0) {
        openNotification({
          title: 'Ошибка',
          text: 'Аккаунт с такой почтой уже создан.',
          type: 'error',
          duration: 5000
        });
      } else {
        openNotification({
          title: 'Ошибка',
          text: 'Возникла серверная ошибка при регистрации. Повторите позже.',
          type: 'error',
          duration: 5000
        });
      }
      setSubmitting(false);
    })
  },

  displayName: 'RegisterForm',
})(RegisterForm);;