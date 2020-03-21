import Ingredient from "../../types/ingredient";

export type OrdersState = 'not_uploaded' | 'loading' | 'error' | 'uploaded';
export interface IFetchedOrder {
  totalPrice: string,
  ingredients: Ingredient[]
}

export interface FetchedOrders {
  [id: string]: IFetchedOrder
}

export interface IOrderData {
  name: string,
  street: string,
  postalCode: string,
  email: string,
}
