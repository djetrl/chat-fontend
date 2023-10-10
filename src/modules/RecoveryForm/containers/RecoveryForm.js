import { withFormik } from "formik";
import RecoveryForm from "../components/RecoveryForm";

import validateForm from "../../../utils/validate";
import  {userActions} from "../../../redux/actions";

import store from '../../../redux/store'

const RecoveryFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",

  }),
  validate: values => {
    let errors = {};

    validateForm({ isAuth: true, values, errors });

    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {

    store.dispatch(userActions.fetchRecoverPassword(values.email.toLowerCase())).then(({data}) => {
      console.log(data);
      if (data.status === "success") {
          // window.location.replace("/signin");
      }
      setSubmitting(false);
    }).catch(()=>{ setSubmitting(false);})
  },
  displayName: "RecoveryForm"
})(RecoveryForm);

export default RecoveryFormContainer;