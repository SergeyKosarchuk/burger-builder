import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_ERROR,
} from './actions'
import { SALAD, CHEESE, BACON, MEAT } from '../../consts/ingredients';
import { IBurgerBuilderState, IngredientPrices, BurgerBuilderActionType } from './types';
import Ingredient from '../../types/ingredient';

const initialState: IBurgerBuilderState = {
    totalPrice: 12,
    isLoading: false,
    error: false,
    ingredients: [],
    ingredientPrices: {
        [SALAD]: 1,
        [CHEESE]: 2,
        [BACON]: 3,
        [MEAT]: 4
    },
    needFetchIngredients: true,
    count: 0,
};

const calculateTotalPrice = (ingredients: Ingredient[], ingredientPrices: IngredientPrices): number => {
   const startPrice = 12;
   return ingredients.reduce((prev, curr) => prev + ingredientPrices[curr], 0) + startPrice;
}

const copyState = (state: IBurgerBuilderState) => {
    return {
        ...state,
        ingredients: [
            ...state.ingredients
        ],
        ingredientPrices: {
            ...state.ingredientPrices
        }
    };
}

const addIngedient = (state: IBurgerBuilderState, ingredient: Ingredient) => {
    const newState = copyState(state);
    newState.ingredients.push(ingredient);
    newState.count += 1;
    newState.totalPrice = calculateTotalPrice(
        newState.ingredients, newState.ingredientPrices)
    return newState;
}

const deleteIngredient = (state: IBurgerBuilderState, ingredient: Ingredient) => {
    const newState = copyState(state);
    const pos = newState.ingredients.lastIndexOf(ingredient);

    if (pos !== -1) {
        newState.ingredients.splice(pos, 1);
        newState.count -= 1;
        newState.totalPrice = calculateTotalPrice(
            newState.ingredients, newState.ingredientPrices);
    }

    return newState
}

const setIngredients = (state: IBurgerBuilderState, ingredients: Ingredient[]) => {
    const newState = copyState(state);
    newState.ingredients = ingredients;
    newState.isLoading = false;
    newState.needFetchIngredients = false;
    newState.totalPrice = calculateTotalPrice(
        newState.ingredients, newState.ingredientPrices);
    newState.count = ingredients.length;
    return newState;
}

const fetchIngredients = (state: IBurgerBuilderState) => {
    const newState = copyState(state);
    newState.isLoading = true;
    return newState;
}

const fetchIngredientsError = (state: IBurgerBuilderState) => {
    const newState = copyState(state);
    newState.isLoading = false;
    newState.error = true;
    return newState;
}

const reducer = (state = initialState, action: BurgerBuilderActionType) => {
    switch ( action.type ) {
        case ADD_INGREDIENT: return addIngedient(state, action.ingredient);
        case DELETE_INGREDIENT: return deleteIngredient(state, action.ingredient);
        case SET_INGREDIENTS: return setIngredients(state, action.ingredients);
        case FETCH_INGREDIENTS: return fetchIngredients(state);
        case FETCH_INGREDIENTS_ERROR: return fetchIngredientsError(state);
        default: return state;
    }
}

export default reducer;