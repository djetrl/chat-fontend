import axios from 'axios';
import getCookie from '../utils/helpers/getCookie' ;
axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common['token'] = getCookie('acsTKn')
window.axios = axios;


export default axios;