import {
    FETCH_ORDERS,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_SUCCSESS
} from './actions';
import Ingredient from '../../types/ingredient';
import IOrder from '../../types/order';


export interface IOrderState {
    orders: IOrder[],
    isLoading: boolean,
    error: string | null,
    needFetchOrders: boolean,
}

export interface IFetchOrdres {
    type: typeof FETCH_ORDERS
}

export interface IFetchOrdersSuccsess {
    type: typeof FETCH_ORDERS_SUCCSESS,
    data: FetchedOrders
}

export interface IFetchOrdersError {
    type: typeof FETCH_ORDERS_ERROR,
    error: string
}

export type FetchOrdersActionType = (
    IFetchOrdres | IFetchOrdersSuccsess | IFetchOrdersError);

export interface IFetchedOrder {
    totalPrice: string,
    ingredients: Ingredient[]
}

export interface FetchedOrders {
    [id: string]: IFetchedOrder
}
