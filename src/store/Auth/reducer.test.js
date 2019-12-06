import reducer from './reducer';
import * as actions from './actions';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            isLoading: false
        })
    });

    it('should store token upon succsess authentication', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            isLoading: false
        }, {
            type: actions.AUTH_SUCCSESS,
            token: 'new token',
            userId: 'new user id'
        })).toEqual({
            token: 'new token',
            userId: 'new user id',
            isLoading: false,
            error: null
        })
    });
});