import { Route, Routes,useLocation, useNavigate} from 'react-router-dom' 
import {LoginForm, RegisterFrom, RecoveryForm} from '../../modules';
import CheckEmailInfo from './components/CheckEmailInfo';
import './Auth.scss';


const Auth = ()=>{

  let location = useLocation();
  let navigate = useNavigate();
  const switchRoute = (pathname)=>{
      switch(pathname){
        case '/signup':
          return (<RegisterFrom/>)
        case '/signup/verify':
          return (<CheckEmailInfo location={location} navigate={navigate}/>)
        case '/signin/recovery/':
          return (<RecoveryForm/>)     
          
        default: 
          return(<LoginForm/>)
      }
  }
  return (
    <section className='auth'>
        <div className="auth__content">
            <Routes >             
              <Route  path={"*"} element={
                  switchRoute(location.pathname)
                // location.pathname === '/signup' ? <RegisterFrom/> : location.pathname === "/signup/verify"?<CheckEmailInfo location={location} navigate={navigate}/>:<LoginForm/>
                }/>
            </Routes>
        </div>
    </section>
  )
      }


export default Auth;
