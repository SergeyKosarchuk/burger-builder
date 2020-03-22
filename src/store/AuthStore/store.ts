import { observable, action, computed } from 'mobx';
import axios from 'axios';

import {
  FIREBASE_AUTH_URL,
  FIREBASE_AUTH_SIGN_IN,
  FIREBASE_AUTH_SIGN_UP
} from '../../consts/urls';
import {
  PENDING_STATE,
  AUTHENTICATED_STATE,
  UNAUTHENTICATED_STATE,
  ERROR_STATE
} from './consts';
import { AuthStoreState } from './types';
import { getUserFromResponse } from './utils';

class AuthStore {
  @observable token?: string = undefined;
  @observable userId?: string = undefined;
  @observable error?: string = undefined;
  @observable state: AuthStoreState = UNAUTHENTICATED_STATE;

  @computed get isAuthenticated(): boolean {
    return this.state === AUTHENTICATED_STATE;
  }

  @computed get isLoading(): boolean {
    return this.state === PENDING_STATE;
  }

  @action
  login = (email: string, password: string) => {
    this.state = PENDING_STATE;
    const url = `${FIREBASE_AUTH_URL}${FIREBASE_AUTH_SIGN_IN}`;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
  };

    axios.post(url, payload, {
      params: {
        key: process.env.REACT_APP_FIREBASE_API_KEY,
      },

    })
    .then(this.loginSuccess)
    .catch(this.loginError)
  }

  @action
  register = (email: string, password: string) => {
    this.state = PENDING_STATE;
    const url = `${FIREBASE_AUTH_URL}${FIREBASE_AUTH_SIGN_UP}`;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios.post(url, payload, {
      params: {
        key: process.env.REACT_APP_FIREBASE_API_KEY,
      },

    })
    .then(this.registerSuccess)
    .catch(this.registerError)
  }

  @action.bound
  loginSuccess (response: any) {
    const [userId, token, expiresInSeconds] = getUserFromResponse(response);

    this.state = AUTHENTICATED_STATE;
    this.userId = userId;
    this.token = token;
    this.error = undefined;

    setTimeout(this.logout, expiresInSeconds * 1000);
  }

  @action.bound
  registerSuccess (response: any) {
    const [userId, token, expiresInSeconds] = getUserFromResponse(response);

    this.state = AUTHENTICATED_STATE;
    this.userId = userId;
    this.token = token;
    this.error = undefined;

    setTimeout(this.logout, expiresInSeconds * 1000);
  }

  @action.bound
  loginError (error: any) {
    this.state = ERROR_STATE;
    this.error = error.response.data.error.message
  }

  @action.bound
  registerError (error: any) {
    this.state = ERROR_STATE;
    this.error = error.response.data.error.message
  }

  @action
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    this.userId = undefined;
    this.token = undefined;
    this.state = UNAUTHENTICATED_STATE;
    this.error = undefined;
  }

  @action
  authCheckState = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let expirationDateStr: string | null = localStorage.getItem('expirationDate');
    let expirationDate: Date | null = null;

    if (expirationDateStr) {
        expirationDate = new Date(expirationDateStr);
    }

    if (token && userId && expirationDate && expirationDate > new Date()) {
      this.token = token;
      this.userId = userId;
      this.state = AUTHENTICATED_STATE;

      const expiresInSeconds = (expirationDate.getTime() - new Date().getTime()) / 1000;
      setTimeout(this.logout, expiresInSeconds * 1000);
    }
  }
}

export default AuthStore;
