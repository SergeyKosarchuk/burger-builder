import axios from '../../axios-orders';
import { ORDERS_URL } from '../../consts/urls';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCSESS = 'FETCH_ORDERS_SUCCSESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

const fetchOrdres = () => ({type: FETCH_ORDERS});
const fetchOrdersSuccsess = data => ({type: FETCH_ORDERS_SUCCSESS, data: data});
const fetchOrdersError = error => ({type: FETCH_ORDERS_ERROR, error: error});

export const fetchOrders = token => {
    return dispatch => {
        dispatch(fetchOrdres());
        const url = token ? ORDERS_URL + `?auth=${token}` : ORDERS_URL;
        axios.get(url)
        .then(response => {
            dispatch(fetchOrdersSuccsess(response.data));
        })
        .catch(error => {
            dispatch(fetchOrdersError(error.response.data.error));
        })
    }
};