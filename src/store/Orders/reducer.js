import { FETCH_ORDERS, FETCH_ORDERS_SUCCSESS, FETCH_ORDERS_ERROR } from './actions';

const initialState = {
    orders: [],
    isLoading: false,
    error: null,
    needFetchOrders: true,
};

const fetchOrders = (state, action) => ({...state, isLoading: true});
const fetchOrdersError = (state, action) => ({...state, isLoading: false, error: action.error});
const fetchOrdersSuccsess = (state, action) => {
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

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS: return fetchOrders(state, action);
        case FETCH_ORDERS_ERROR: return fetchOrdersError(state, action);
        case FETCH_ORDERS_SUCCSESS: return fetchOrdersSuccsess(state, action);
        default: return state;
    }
};

export default reducer;