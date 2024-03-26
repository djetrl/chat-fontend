import axios from 'axios';
import getCookie from '../utils/helpers/getCookie' ;
axios.defaults.baseURL = "https://217.71.129.139:4380/";
axios.defaults.headers.common['token'] = getCookie('acsTKn')
window.axios = axios;


export default axios;