import { observable } from 'mobx';

import { BaseEntity, IBaseEntityResponse, IBaseEntity } from './base';
import Ingredient, { IIngredientResponse } from './customingredient';

export interface IBurgerResponse extends IBaseEntityResponse {
  ingredients: IIngredientResponse[];
  price: number;
  name: string;
}

export interface IBurger extends IBaseEntity {
  ingredients: Ingredient[];
  price: number;
  name: string;
}

export default class Burger extends BaseEntity implements IBurger {
  @observable ingredients: Ingredient[] = [];
  @observable price: number;
  @observable name: string;

  constructor(obj: IBurgerResponse) {
    super(obj);
    this.name = obj.name;
    this.price = obj.price;
    this.ingredients = obj.ingredients.map(
      ingredient => new Ingredient(ingredient))
  }
}
