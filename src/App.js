import {Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {Home} from './pages';
import {RequireAuth} from './utils/helpers'
import {lazy} from 'react';

const AuthLazy = lazy(()=>import('./pages/Auth/index'))

function App(props) {
   const { isAuth,theme } = props;

  return (
    <div className="wrapper" data-theme={theme}>
      <Routes>  
        <Route  path='/signin/*' Component={AuthLazy}  />
        <Route  path='/signup' Component={AuthLazy}  />
        <Route  path='/signup/verify/*' Component={AuthLazy}  />
        <Route  path='/signin/recovery/*' Component={AuthLazy}  />
        <Route path='*' element={
            <RequireAuth isAuth={isAuth}>
              <Home/>
            </RequireAuth>
        } />;

      
      </Routes>
        
    </div>
  );
} 
export default connect(({ user }) => ({ 
  isAuth: user.isAuth ,
  theme: user.theme
}))(App);
