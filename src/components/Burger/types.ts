import Ingredient from "../../types/customingredient";

export interface IIngredient {
  name: string,
  position: number,
}

export interface IBurgerProps {
  ingredients: Ingredient[]
}
