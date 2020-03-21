import Ingredient from "../../../types/ingredient";

export interface IBuildControlsProps {
  price: string,
  isAuthenticated: boolean,
  ingredientsSelected: boolean,
  disabled: Ingredient[],
  orderCompleteHandler(): void,
  ingredientAdded(ingredient: string): void,
  ingredientRemoved(ingredient: string): void,
}