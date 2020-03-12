import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { 
    AUTH_START,
    AUTH_SUCCSESS,
    AUTH_FAILED,
    AUTH_LOGOUT
} from './actions';

export interface IAuthState {
    token?: string,
    userId?: string,
    error?: string,
    isLoading: boolean,
}

export interface IAuthStartAction {
    type: typeof AUTH_START
}

export interface IAuthSuccsessAction {
    type: typeof AUTH_SUCCSESS,
    token: string,
    userId: string
}

export interface IAuthFailedAction {
    type: typeof AUTH_FAILED
    error: string,
}

export interface IAuthLogoutAction {
    type: typeof AUTH_LOGOUT
}

export type AuthActionType = (
    IAuthStartAction | IAuthSuccsessAction | 
    IAuthFailedAction | IAuthLogoutAction
);

export type AuthThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IAuthState,
  unknown,
  AuthActionType
>