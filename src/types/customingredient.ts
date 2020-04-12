import { observable } from 'mobx';

import {
  BaseEntity,
  IBaseEntityResponse,
  IBaseEntity
} from './base';

export interface IIngredientResponse extends IBaseEntityResponse {
  name: string;
  price: number;
}

export interface IIngredient extends IBaseEntity {
  name: string;
  price: number
}

export default class Ingredient extends BaseEntity implements IIngredient {
  @observable name: string;
  @observable price: number;

  constructor(obj: IIngredientResponse) {
    super(obj);
    this.name = obj.name;
    this.price = obj.price;
  }
}
