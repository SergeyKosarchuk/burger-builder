import axios from '../axios-orders';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGEDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';

export const addIngredient = ingedient => ({type: ADD_INGREDIENT, ingredient: ingedient});
export const deleteIngredient = ingedient => ({type: DELETE_INGREDIENT, ingredient: ingedient});
export const setIngredients = ingredients => ({type: SET_INGREDIENTS, ingredients: ingredients});
export const fetchIngredients = () => ({type: FETCH_INGREDIENTS});
export const fetchIngredientsError = (error) => ({type: FETCH_INGREDIENTS_ERROR, error: error});

export const initIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredients())

        axios.get('start_ingredients/.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        // .catch(error => {
        //     dispatch(fetchIngredientsError(error))
        // })
    }
}