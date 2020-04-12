import { observable, action, computed } from 'mobx';
import api, { setAuthToken, unsetAuthToken } from './../../api';

import {
  SIGN_IN_URL,
  SIGN_UP_URL,
} from '../../consts/urls';
import {
  PENDING_STATE,
  AUTHENTICATED_STATE,
  UNAUTHENTICATED_STATE,
  ERROR_STATE
} from './consts';
import { AuthStoreState, JWTResponse } from './types';
import User, { IUserResponse, ANONYMOUS } from '../../types/user';


class AuthStore {
  @observable token?: string = undefined;
  @observable user: User = ANONYMOUS;
  @observable error?: string = undefined;
  @observable state: AuthStoreState = UNAUTHENTICATED_STATE;

  @computed get isAuthenticated(): boolean {
    return this.state === AUTHENTICATED_STATE;
  }

  @computed get isLoading(): boolean {
    return this.state === PENDING_STATE;
  }

  @action
  login = (username: string, password: string) => {
    this.state = PENDING_STATE;
    const payload = {
      username: username,
      password: password,
  };

    api.post<string>(SIGN_IN_URL, payload)
    .then(this.loginSuccess)
    .catch(this.loginError)
  }

  @action
  register = (username: string, password: string, email: string, age: number|undefined) => {
    this.state = PENDING_STATE;
    const payload = {
      username: username,
      password: password,
      email: email,
      age: age
    };

    api.post<IUserResponse>(SIGN_UP_URL, payload)
    .then((response) => this.registerSuccess(response.data))
    .then(() => this.login(username, password))
    .catch(this.registerError)
  }

  @action.bound
  loginSuccess (response: JWTResponse) {
    const token = response.data;

    this.state = AUTHENTICATED_STATE;
    this.token = token;
    this.error = undefined;
    setAuthToken(this.token);
    this.setUser(token);
    localStorage.setItem('token', token);
  }

  @action.bound
  registerSuccess (userObj: IUserResponse) {
    this.user = new User(userObj);
    this.error = undefined;
  }

  @action.bound
  loginError (error: any) {
    this.state = ERROR_STATE;
    this.error = error.toString();
    unsetAuthToken();
  }

  @action.bound
  registerError (error: any) {
    this.state = ERROR_STATE;
    this.error = error.toString();
  }

  @action
  logout = () => {
    this.token = undefined;
    this.state = UNAUTHENTICATED_STATE;
    this.error = undefined;
    this.user = ANONYMOUS;

    unsetAuthToken();
    localStorage.removeItem('token');
  }

  @action
  setUser = async (token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`}
    }

    this.state = PENDING_STATE;

    try {
      const resp = await api.get<IUserResponse>('/whoami', config)

      if (!resp.status) {
        throw new Error('No response status!')
      }

      this.user = new User(resp.data);
      this.state = AUTHENTICATED_STATE;
      this.token = token;
      setAuthToken(token);
    }
    catch (error) {
      this.error = error.message;
      this.user = ANONYMOUS;
      this.token = undefined;
      this.state = ERROR_STATE;
    }
  }

  @action
  authCheckState = () => {
    const token = localStorage.getItem('token');

    if (token) {
      this.setUser(token)
    }
  }
}

export default AuthStore;
