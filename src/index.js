import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import { userActions } from './redux/actions';
import store from './redux/store';
import './styles/index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(userActions.fetchUserData())
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <Router>
           <App/>
        </Router>
      </Provider>
  </React.StrictMode>
);

