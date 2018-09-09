import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
/**
 * feed apis
 */
const fetchPages = () => {
  axios.get(`/api/v2/pages/?format=json`);
};

export default fetchPages;
