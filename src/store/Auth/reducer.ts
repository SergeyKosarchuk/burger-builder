import { AUTH_START,
    AUTH_FAILED,
    AUTH_SUCCSESS,
    AUTH_LOGOUT
} from './actions'
import {
    IAuthState,
    IAuthSuccsessAction,
    IAuthFailedAction,
    AuthActionType
} from './types';

const initialState: IAuthState = {
    token: undefined,
    userId: undefined,
    error: undefined,
    isLoading: false,
};

const authStart = (state: IAuthState) => ({...state, isLoading: true});
const authSuccsess = (state: IAuthState, action: IAuthSuccsessAction): IAuthState => ({
    ...state,
    token: action.token,
    userId: action.userId,
    error: undefined,
    isLoading: false,
});

const authFailed = (state: IAuthState, action: IAuthFailedAction): IAuthState => ({
    ...state,
    token: undefined,
    error: action.error,
    isLoading: false
});

const authLogout = (state: IAuthState): IAuthState => ({
    ...state,
    token: undefined,
    userId: undefined
});

const reducer = (state = initialState, action: AuthActionType) => {
    switch ( action.type ) {
        case AUTH_START: return authStart(state);
        case AUTH_SUCCSESS: return authSuccsess(state, action);
        case AUTH_FAILED: return authFailed(state, action);
        case AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
}

export default reducer;