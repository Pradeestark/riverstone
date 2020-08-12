import axios from 'axios';
import { USER_TOKEN } from '../services/constants';

// const DEFAULT_HEADERS = {
//   Accept: "application/json",
//   "Content-Type": "application/json;charset=UTF-8",
//   "Access-Control-Allow-Origin": "*",
//   "Origin": "*",
// }

const API = axios.create({
  baseURL: `http://206.189.136.81/api/`,
  timeout: 50000,
  // headers: {"x-auth": USER_TOKEN},
});

API.interceptors.request.use(
  async config => {
    const token = USER_TOKEN
    if (token) {
      config.headers['x-auth'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  function(response) {
   return response;
  },
  function(error) {
    throw Error(error);
  }
);



export default API;
