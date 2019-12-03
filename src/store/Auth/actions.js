import axios from 'axios';
import {
    FIREBASE_AUTH_URL,
    FIREBASE_AUTH_SIGN_IN,
    FIREBASE_AUTH_SIGN_UP
} from '../../consts/urls';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCSESS = 'AUTH_SUCCSESS';
export const AUTH_FAILED = 'AUTH_FAIL';

const authStart = () => ({type: AUTH_START});
const authFailed = error => ({type: AUTH_FAILED, error: error});
const authSuccsess = (token, userId) => ({type: AUTH_SUCCSESS, token: token, userId: userId});

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        let url = FIREBASE_AUTH_URL;
        const payloadd = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const key = process.env.REACT_APP_FIREBASE_API_KEY;

        if (isSignUp){
            url = url + FIREBASE_AUTH_SIGN_UP;
        }
        else {
            url = url + FIREBASE_AUTH_SIGN_IN;
        }
        url = url + `?key=${key}`

        axios.post(url, payloadd)
        .then(response => {
            const token = response.data.idToken;
            const userId = response.data.localId;
            dispatch(authSuccsess(token, userId));
        })
        .catch(error => {
            dispatch(authFailed(error));
        });
    }
}