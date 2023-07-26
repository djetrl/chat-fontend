import {Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {Auth,Home} from './pages';
import {RequireAuth} from './utils/helpers'

function App(props) {
   const { isAuth } = props;

  return (
    <div className="wrapper">
      <Routes>  
        <Route  path='/signin/*' Component={Auth}  />
        <Route  path='/signup' Component={Auth}  />
        <Route  path='/signup/verify/*' Component={Auth}  />
        <Route path='*' element={
            <RequireAuth isAuth={isAuth}>
              <Home/>
            </RequireAuth>
        } />;

      
      </Routes>
        
    </div>
  );
} 
export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
