import axios from 'axios';

const dbURL = process.env.REACT_APP_FIREBASE_DB_URL;
const dbNameSpace = process.env.REACT_APP_FIREBASE_NAME_SPACE;
const baseURL = `${dbURL}${dbNameSpace}`

const instance = axios.create({
    baseURL: baseURL,
});

export default instance;