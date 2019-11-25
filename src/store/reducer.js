import { ADD_INGREDIENT, DELETE_INGREDIENT } from './actions'
import { SALADE, CHEESE, BACON, MEAT } from '../consts/ingredients';

const initialState = {
    totalPrice: 12,
    ingredients: {
        [SALADE]: 1,
        [CHEESE]: 2,
        [BACON]: 1,
        [MEAT]: 1
    },
    ingredientPrices: {
        [SALADE]: 1,
        [CHEESE]: 2,
        [BACON]: 3,
        [MEAT]: 4
    }
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
    return newState
}

const deleteIngredient = (state, ingredient) => {
    const newState = copyState(state);
    newState.ingredients[ingredient] -= 1;
    newState.totalPrice = calculateTotalPrice(
        newState.ingredients, newState.ingredientPrices)
    return newState
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case ADD_INGREDIENT:
            return addIngedient(state, action.ingredient);
        case DELETE_INGREDIENT:
            return deleteIngredient(state, action.ingredient);
        default:
            return state;
    }
}

export default reducer;