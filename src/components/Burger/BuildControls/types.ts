import Ingredient from "../../../types/customingredient";

export interface IBuildControlsProps {
  price: string,
  isAuthenticated: boolean,
  ingredients: Ingredient[],
  orderCompleteHandler(): void,
  ingredientAdded(ingredient: Ingredient): void,
  ingredientRemoved(ingredient: Ingredient): void,
}
