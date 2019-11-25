export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGEDIENT';

export const addIngredient = ingedient => ({type: ADD_INGREDIENT, ingredient: ingedient});
export const deleteIngredient = ingedient => ({type: DELETE_INGREDIENT, ingredient: ingedient});
