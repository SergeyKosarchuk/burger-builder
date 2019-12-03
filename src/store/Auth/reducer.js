import { AUTH_START, AUTH_FAILED, AUTH_SUCCSESS } from './actions'

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
    error: action.error,
    isLoading: false,
});

const authFailed = (state, action) => ({
    ...state,
    token: null,
    error: action.error,
    isLoading: false
});

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCSESS: return authSuccsess(state, action);
        case AUTH_FAILED: return authFailed(state, action);
        default: return state;
    }
}

export default reducer;