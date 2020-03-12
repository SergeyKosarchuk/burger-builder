import axios from '../../axios-orders';
import Ingredient from '../../types/ingredient';
import {
    AddIngredientAction,
    DeleteIngredientAction,
    SetIngredientsAction,
    FetchIngredientsAction,
    FetchIngredientsErrorAction,
    BurgerBuilderActionType
} from './types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGEDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS = 'FETCH_INGREDIENTS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';

export const addIngredient = (ingedient: Ingredient): AddIngredientAction => ({type: ADD_INGREDIENT, ingredient: ingedient});
export const deleteIngredient = (ingedient: Ingredient): DeleteIngredientAction => ({type: DELETE_INGREDIENT, ingredient: ingedient});
export const setIngredients = (ingredients: Ingredient[]): SetIngredientsAction => ({type: SET_INGREDIENTS, ingredients: ingredients});
export const fetchIngredients = (): FetchIngredientsAction => ({type: FETCH_INGREDIENTS});
export const fetchIngredientsError = (): FetchIngredientsErrorAction => ({type: FETCH_INGREDIENTS_ERROR});

type Dispatch = (action: BurgerBuilderActionType) => void;

export const initIngredients = () => {
    return (dispatch: Dispatch) => {
        dispatch(fetchIngredients())

        axios.get('start_ingredients/.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
    }
}
