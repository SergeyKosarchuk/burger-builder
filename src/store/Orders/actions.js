import axios from '../../axios-orders';
import { ORDERS_URL } from '../../consts/urls';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCSESS = 'FETCH_ORDERS_SUCCSESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

const fetchOrdres = () => ({type: FETCH_ORDERS});
const fetchOrdersSuccsess = data => ({type: FETCH_ORDERS_SUCCSESS, data: data});
const fetchOrdersError = error => ({type: FETCH_ORDERS_ERROR, error: error});

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdres());
        const queryParams = `?auth=${token}&orderBy="customer/userId"&equalTo="${userId}"`
        axios.get(ORDERS_URL + queryParams)
        .then(response => {
            dispatch(fetchOrdersSuccsess(response.data));
        })
        .catch(error => {
            dispatch(fetchOrdersError(error.response.data.error));
        })
    }
};