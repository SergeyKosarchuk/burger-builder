import { observable } from 'mobx';
import { BaseEntity, IBaseEntityResponse } from './base';

export interface IUserResponse extends IBaseEntityResponse {
  username: string;
  email: string;
  age?: number;
}

export default class User extends BaseEntity {
  @observable username: string;
  @observable age?: number;
  @observable email: string;

  constructor(obj: IUserResponse) {
    super(obj)
    this.username = obj.username;
    this.age = obj.age;
    this.email = obj.email;
  }
}

const ANONYMOUS = new User({
  _id: '1',
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
  username: 'Anon',
  email: 'anon@burger-builder.com'
});

export { ANONYMOUS };
