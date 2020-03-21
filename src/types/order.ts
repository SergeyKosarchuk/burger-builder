import Ingredient from "./ingredient";

export default interface IOrder {
  ingredients: Ingredient[],
  totalPrice: string,
  id: string
}
