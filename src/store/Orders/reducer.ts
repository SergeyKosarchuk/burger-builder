import { 
    FETCH_ORDERS,
    FETCH_ORDERS_SUCCSESS,
    FETCH_ORDERS_ERROR
} from './actions';
import {
    IOrderState,
    IFetchOrdersError,
    IFetchOrdersSuccsess,
    FetchOrdersActionType
} from './types';

const initialState: IOrderState = {
    orders: [],
    isLoading: false,
    error: null,
    needFetchOrders: true,
};

const fetchOrders = (state: IOrderState): IOrderState => ({...state, isLoading: true});
const fetchOrdersError = (state: IOrderState, action: IFetchOrdersError): IOrderState => ({...state, isLoading: false, error: action.error});
const fetchOrdersSuccsess = (state: IOrderState, action: IFetchOrdersSuccsess): IOrderState => {
    const newState = {...state};
    const orders = Object.entries(action.data).map(([id, order]) => ({
        id: id,
        totalPrice: order.totalPrice,
        ingredients: order.ingredients
    }))
    newState.orders = orders;
    newState.isLoading = false;
    newState.needFetchOrders = false;
    newState.error = null;
    return newState;
};

const reducer = (state=initialState, action: FetchOrdersActionType): IOrderState => {
    switch (action.type) {
        case FETCH_ORDERS: return fetchOrders(state);
        case FETCH_ORDERS_ERROR: return fetchOrdersError(state, action);
        case FETCH_ORDERS_SUCCSESS: return fetchOrdersSuccsess(state, action);
        default: return state;
    }
};

export default reducer;