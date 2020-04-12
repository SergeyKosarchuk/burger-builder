import { observable, action, computed } from 'mobx';

import api from '../../api';
import {
  NOT_UPLOADED,
  LOADING,
  SUCCSESS,
  ERROR
} from '../../consts/states';
import Ingredient from '../../types/customingredient';
import Burger, { IBurgerResponse } from '../../types/burger';
import { LoadingState } from '../../types/states';
import { BURGERS_URL } from '../../consts/urls';
import { count } from '../../utils';
import { IRootStore } from '../store';

export type IngredinetCounts = {
  [key: string]: number
}

class BurgerBuilderStore {
  @observable state: LoadingState = NOT_UPLOADED;
  @observable extraIngredients: Ingredient[] = [];
  @observable excludeIngredients: Ingredient[] = [];
  @observable burger?: Burger;
  @observable error?: string;
  @observable IngredinetCounts: IngredinetCounts = {};

  constructor(private readonly rootStore: IRootStore) {}

  @computed get ingredients() {
    let ingredients = this.burger ? this.burger.ingredients : [];
    ingredients = ingredients.concat(this.extraIngredients)

    this.excludeIngredients.forEach(ingredient => {
      const pos = ingredients.findIndex(item => (item._id === ingredient._id));
      if (pos !== -1) {
        ingredients.splice(pos, 1);
      }
    })

    return ingredients
  }

  @computed get totalPrice() {
    return this.extraIngredients.reduce(
      (prev, curr) => ( prev + curr.price ), this.burger ? this.burger.price : 0);
  }

  @computed get isLoading() {
    return this.state === LOADING
  }

  @computed get disabledIngredients () {
    const disabledIngredients: Ingredient[] = [];

    const ingredientCounter = (ingredient: Ingredient): number => {
      return count(this.ingredients, (item: Ingredient) => item._id, ingredient)
    }

    for (const ingredient of this.rootStore.ingredientsStore.ingredients) {
      if (!ingredientCounter(ingredient)) {
        disabledIngredients.push(ingredient);
      }
    }

    return disabledIngredients;
  }

  @action addIngredient = (ingredient: Ingredient) => {
    const pos = this.excludeIngredients.findIndex(
      item => (item._id === ingredient._id));

    if (pos !== -1) {
      this.excludeIngredients.splice(pos, 1);
    }
    else {
      this.extraIngredients.push(ingredient);
    }
  }

  @action deleteIngredient = (ingredient: Ingredient) => {
    const pos = this.extraIngredients.findIndex(
      item => (item._id === ingredient._id));

    if (pos !== -1) {
      this.extraIngredients.splice(pos, 1);
    }
    else {
      const pos = this.ingredients.findIndex(
        item => (item._id === ingredient._id));

      if ( pos !== undefined &&  pos !== -1 ) {
        this.excludeIngredients.push(ingredient);
      }
    }
  }

  @action fetchBurger = () => {
    this.state = LOADING;

    api.get<IBurgerResponse[]>(BURGERS_URL)
    .then(response => this.fetchBurgerSuccsess(response.data[0]))
    .catch(response => this.fetchBurgerError(response.error));
  }

  @action.bound fetchBurgerSuccsess = (burger: IBurgerResponse) => {
    this.state = SUCCSESS;
    this.burger = new Burger(burger);
  }

  @action.bound fetchBurgerError = (error: string) => {
    this.state = ERROR;
    this.error = error;
  }
}

export default BurgerBuilderStore;
