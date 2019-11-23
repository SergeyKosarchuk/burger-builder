import { SAVE_ORDER } from './actions'

const initialState = {
    totalPrice: null,
    ingredients: {},
};

const saveOrder = (state, ingredients, totalPrice) => {
    return {...state, ingredients: ingredients, totalPrice: totalPrice};
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SAVE_ORDER:
            const {ingredients, totalPrice} = action.payload;
            return saveOrder(state, ingredients, totalPrice)
        default:
            return state;
    }
}

export default reducer;