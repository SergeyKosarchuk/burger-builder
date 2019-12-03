import axios from '../axios-orders';
import axiosStandard from 'axios';
import {
    FIREBASE_AUTH_URL,
    FIREBASE_AUTH_SIGN_IN,
    FIREBASE_AUTH_SIGN_UP
} from '../consts/urls';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGEDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCSESS = 'AUTH_SUCCSESS';
export const AUTH_FAILED = 'AUTH_FAIL';

export const addIngredient = ingedient => ({type: ADD_INGREDIENT, ingredient: ingedient});
export const deleteIngredient = ingedient => ({type: DELETE_INGREDIENT, ingredient: ingedient});
export const setIngredients = ingredients => ({type: SET_INGREDIENTS, ingredients: ingredients});
export const fetchIngredients = () => ({type: FETCH_INGREDIENTS});
export const fetchIngredientsError = error => ({type: FETCH_INGREDIENTS_ERROR, error: error});

export const authStart = () => ({type: AUTH_START});
export const authFailed = error => ({type: AUTH_FAILED, error: error});
export const authSuccsess = (token, userId) => ({type: AUTH_SUCCSESS, token: token, userId: userId});

export const initIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredients())

        axios.get('start_ingredients/.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
    }
}

export const authanticate = (email, password, isSignUp) => {
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

        axiosStandard.post(url, payloadd)
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
