import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_ERROR,
} from './actions'
import { SALAD, CHEESE, BACON, MEAT } from '../../consts/ingredients';

const initialState = {
    totalPrice: 12,
    isLoading: false,
    error: false,
    ingredients: {},
    ingredientPrices: {
        [SALAD]: 1,
        [CHEESE]: 2,
        [BACON]: 3,
        [MEAT]: 4
    },
};

const calculateTotalPrice = (ingredients, ingredientPrices) => {
    return Object.entries(ingredients).reduce((previousValue, currentValue) => {
        return previousValue + ingredientPrices[currentValue[0]] * currentValue[1];
    }, 0)
}

const copyState = (state) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients
        },
        ingredientPrices: {
            ...state.ingredientPrices
        }
    };
}

const addIngedient = (state, ingredient) => {
    const newState = copyState(state);
    newState.ingredients[ingredient] += 1;
    newState.totalPrice = calculateTotalPrice(
        newState.ingredients, newState.ingredientPrices)
    return newState;
}

const deleteIngredient = (state, ingredient) => {
    const newState = copyState(state);
    newState.ingredients[ingredient] -= 1;
    newState.totalPrice = calculateTotalPrice(
        newState.ingredients, newState.ingredientPrices)
    return newState
}

const setIngredients = (state, ingredients) => {
    const newState = copyState(state);
    newState.ingredients = ingredients;
    newState.isLoading = false;
    return newState;
}

const fetchIngredients = (state) => {
    const newState = copyState(state);
    newState.isLoading = true;
    return newState;
}

const fetchIngredientsError = (state, error) => {
    const newState = copyState(state);
    newState.isLoading = false;
    newState.error = error;
    return newState;
}

const reducer = (state = initialState, action) => {
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