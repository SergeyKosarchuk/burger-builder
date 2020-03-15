import { observable, action, computed } from 'mobx';

import axios from '../../axios-orders';
import {
  STARTING_PRICE,
  INGREDIENT_PRICES,
  NOT_UPLOADED,
  LOADING,
  SUCCSESS,
  ERROR
} from './consts';
import Ingredient from '../../types/ingredient';
import { BurgerBuilderState } from './types';
import { SELECTABLE_INGREDIENTS } from '../../consts/ingredients';
import { count } from '../../utils';


class BurgerBuilderStore {
  @observable state: BurgerBuilderState = NOT_UPLOADED;
  @observable ingredients: Ingredient[] = [];
  @observable error?: string;

  @computed get totalPrice() {
    const ingredientsPrice = this.ingredients.reduce(
      (prev, curr) => prev + INGREDIENT_PRICES[curr], 0);

    return (ingredientsPrice + STARTING_PRICE).toFixed(2);
  }

  @computed get isLoading() {
    return this.state === LOADING
  }

  @computed get isIngredientsSelected () {
    return !!this.ingredients.length
  }

  @computed get disabledIngredients () {
    const disabled: Ingredient[] = [];

    for (let ingredient of SELECTABLE_INGREDIENTS) {
      if (count(ingredient, this.ingredients) === 0) {
          disabled.push(ingredient)
      }
    }

    return disabled;
  }

  @action addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
  }

  @action deleteIngredient = (ingredient: Ingredient) => {
    const position = this.ingredients.lastIndexOf(ingredient);

    if (position !== -1) {
      this.ingredients.splice(position, 1);
    }
  }

  @action fetchIngredients = () => {
    this.state = LOADING;

    axios.get('start_ingredients/.json')
    .then(response => this.fetchIngredientsSuccsess(response.data))
    .catch(response => this.fetchIngredientsError(response.error));
  }

  @action.bound fetchIngredientsSuccsess = (ingredients: Ingredient[]) => {
    this.state = SUCCSESS;
    this.ingredients = ingredients;
  }

  @action.bound fetchIngredientsError = (error: string) => {
    this.state = ERROR;
    this.error = error;
  }
}

export default BurgerBuilderStore;
