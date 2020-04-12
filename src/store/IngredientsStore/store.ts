import axios from '../../api';
import { observable, action } from 'mobx';
import Ingredient from '../../types/customingredient';
import { IIngredientResponse } from '../../types/customingredient';
import { INGREDIENTS_URL } from '../../consts/urls';
import {
  NOT_UPLOADED,
  SUCCSESS,
  ERROR,
  LOADING
} from '../../consts/states';


class IngredientsStore {
  @observable ingredients: Ingredient[] = [];
  @observable error?: string;
  @observable state: string = NOT_UPLOADED;

  @action fetchIngredients = () => {
    this.state = LOADING;

    axios.get<IIngredientResponse[]>(INGREDIENTS_URL)
    .then(response => this.fetchIngredientsSuccsess(response.data))
    .catch(error => this.fetchIngredientsError(error.toString()));
  }

  @action.bound fetchIngredientsSuccsess = (ingredients: IIngredientResponse[]) => {
    this.state = SUCCSESS;
    this.ingredients = ingredients.map(ingredient => {
      return new Ingredient(ingredient);
    })
  }

  @action.bound fetchIngredientsError = (error: string) => {
    this.state = ERROR;
    this.error = error;
  }
}

export default IngredientsStore;
