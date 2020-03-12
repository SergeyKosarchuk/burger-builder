import axios from 'axios';

import {
    FIREBASE_AUTH_URL,
    FIREBASE_AUTH_SIGN_IN,
    FIREBASE_AUTH_SIGN_UP
} from '../../consts/urls';
import { AuthActionType, AuthThunk } from './types';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCSESS = 'AUTH_SUCCSESS';
export const AUTH_FAILED = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const authStart = (): AuthActionType => ({type: AUTH_START});
const authFailed = (error: string): AuthActionType => ({
    type: AUTH_FAILED,
    error: error
});
const authSuccsess = (token: string, userId: string): AuthActionType => ({
    type: AUTH_SUCCSESS,
    token: token,
    userId: userId
});

export const logout = (): AuthActionType => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {type: AUTH_LOGOUT};
};

export const authenticate = (email: string, password: string, isSignUp: boolean): AuthThunk => {
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
            const expiresInSeconds = parseInt(response.data.expiresIn, 10);
            const expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + expiresInSeconds);

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('expirationDate', expirationDate.toString());

            dispatch(authSuccsess(token, userId));
            dispatch(checkAuthTimeout(expiresInSeconds));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error.message));
        });
    }
}

export const checkAuthTimeout = (expiresInSeconds: number): AuthThunk => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expiresInSeconds * 1000);
    }
};

export const authCheckState = (): AuthThunk => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        let expirationDateStr: string | null = localStorage.getItem('expirationDate');
        let expirationDate: Date | null = null;

        if (expirationDateStr) {
            expirationDate = new Date(expirationDateStr);
        }

        if (!token || !userId || !expirationDate || expirationDate < new Date()) {
            dispatch(logout());
        }
        else {
            const expiresInSeconds = (expirationDate.getTime() - new Date().getTime()) / 1000;

            dispatch(authSuccsess(token, userId));
            dispatch(checkAuthTimeout(expiresInSeconds));
        }
    }
};