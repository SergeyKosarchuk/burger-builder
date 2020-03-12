import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_ERROR
} from './actions';
import Ingredient from '../../types/ingredient';

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT,
    ingredient: Ingredient,
}

export interface DeleteIngredientAction {
    type: typeof DELETE_INGREDIENT,
    ingredient: Ingredient,
}

export interface SetIngredientsAction {
    type: typeof SET_INGREDIENTS,
    ingredients: Ingredient[],
}

export interface FetchIngredientsAction {
    type: typeof FETCH_INGREDIENTS,
}

export interface FetchIngredientsErrorAction {
    type: typeof FETCH_INGREDIENTS_ERROR,
}

export type BurgerBuilderActionType = (
    AddIngredientAction | DeleteIngredientAction | SetIngredientsAction 
    | FetchIngredientsAction | FetchIngredientsErrorAction);

export type IngredientPrices = {
    [ingredient in Ingredient]: number;
};

export interface IBurgerBuilderState {
    totalPrice: number,
    isLoading: boolean,
    error: boolean,
    ingredients: Ingredient[],
    ingredientPrices: IngredientPrices,
    needFetchIngredients: boolean,
    count: number,
}
