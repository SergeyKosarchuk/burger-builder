import { observable } from 'mobx';

import { BaseEntity, IBaseEntityResponse, IBaseEntity } from './base';
import Ingredient, { IIngredientResponse } from './customingredient';
import User, { IUserResponse } from './user';
import Burger, { IBurgerResponse } from './burger';

export interface IOrderResponse extends IBaseEntityResponse {
  burger: IBurgerResponse;
  extraIngredients: IIngredientResponse[];
  excludeIngredients: IIngredientResponse[];
  price: number;
  customer: IUserResponse;
}

export interface IOrder extends IBaseEntity {
  burger: Burger;
  extraIngredients: Ingredient[];
  excludeIngredients: Ingredient[];
  price: number;
  customer: User;
}

export default class Order extends BaseEntity implements IOrder {
  @observable extraIngredients: Ingredient[] = [];
  @observable excludeIngredients: Ingredient[] = [];
  @observable burger: Burger;
  @observable price: number;
  @observable customer: User;

  constructor(obj: IOrderResponse) {
    super(obj);
    this.burger = new Burger(obj.burger);
    this.price = obj.price;
    this.customer = new User(obj.customer);
    this.extraIngredients = obj.extraIngredients.map(
      ingredient => new Ingredient(ingredient))
    this.excludeIngredients = obj.excludeIngredients.map(
      ingredient => new Ingredient(ingredient))
  }
}
