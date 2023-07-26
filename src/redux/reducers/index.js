import {combineReducers} from 'redux';

const reducers = ['messages', 'dialogs', 'user','attachments'];
export default combineReducers(
  reducers.reduce((inital, name)=>{
    inital[name] = require(`./${name}`).default;
    return inital
  }, {})
)