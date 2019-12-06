import { AUTH_START, AUTH_FAILED, AUTH_SUCCSESS, AUTH_LOGOUT } from './actions'

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false,
};

const authStart = state => ({...state, isLoading: true});
const authSuccsess = (state, action) => ({
    ...state,
    token: action.token,
    userId: action.userId,
    error: null,
    isLoading: false,
});

const authFailed = (state, action) => ({
    ...state,
    token: null,
    error: action.error,
    isLoading: false
});

const authLogout = (state, logout) => ({
    ...state,
    token: null,
    userId: null
});

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCSESS: return authSuccsess(state, action);
        case AUTH_FAILED: return authFailed(state, action);
        case AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer;