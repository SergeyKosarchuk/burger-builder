import Ingredient from "../../types/ingredient";

export interface IIngredient {
  name: string,
  position: number,
}

export interface IBurgerProps {
  ingredients: Ingredient[]
}