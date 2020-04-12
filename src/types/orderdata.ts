import Burger from './burger';
import Ingredient from './customingredient';

export default interface IOrderData {
  address: string;
  burger: Burger;
  extraIngredients: Ingredient[];
  excludeIngredients: Ingredient[];
}
