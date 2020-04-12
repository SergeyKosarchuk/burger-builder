export interface IBaseEntityResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBaseEntity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity implements IBaseEntity {
  readonly _id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(obj: IBaseEntityResponse) {
    this._id = obj._id;
    this.createdAt = new Date(obj.createdAt);
    this.updatedAt = new Date(obj.updatedAt);
  }
}
