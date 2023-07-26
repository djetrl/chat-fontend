import { Route, Routes,useLocation, useNavigate} from 'react-router-dom' 
import {LoginForm, RegisterFrom} from '../../modules';
import CheckEmailInfo from './components/CheckEmailInfo';
import './Auth.scss';


const Auth = ()=>{

  let location = useLocation();
  let navigate = useNavigate();
  return (
    <section className='auth'>
        <div className="auth__content">
            <Routes >             
              <Route  path={"*"} element={location.pathname === '/signup' ? <RegisterFrom/> : location.pathname === "/signup/verify"?<CheckEmailInfo location={location} navigate={navigate}/>:<LoginForm/>}/>
            </Routes>
        </div>
    </section>
  )
      }


export default Auth;
