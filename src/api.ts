import axios from 'axios';

const _axios = axios.create({ baseURL: process.env.REACT_APP_SERVICE_URL, timeout: 1000 })

const setAuthToken = (token: string) => {
  _axios.defaults.headers = {
    Authorization: `Bearer ${token}`
  };
};

const unsetAuthToken = () => {
  _axios.defaults.headers.Authorization = undefined;
}

export default _axios;
export { setAuthToken , unsetAuthToken };
