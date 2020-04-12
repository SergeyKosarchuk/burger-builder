import { observable, action, computed } from 'mobx';
import api from '../../api';
import { ORDERS_URL } from '../../consts/urls';
import Order, { IOrderResponse } from '../../types/order';
import { IRootStore } from '../store';
import { SUCCSESS, LOADING, ERROR, NOT_UPLOADED } from '../../consts/states';
import { LoadingState } from '../../types/states';
import IOrderData from '../../types/orderdata';



class OrdersStore {
  @observable orders: Order[] = [];
  @observable state: LoadingState = NOT_UPLOADED;
  @observable error?: string = undefined;

  constructor(private rootStore: IRootStore){}

  @action
  saveOrder = async (orderData: IOrderData) => {
    this.state = LOADING;
    const response = await api.post<IOrderResponse>(ORDERS_URL, orderData);
    const order = new Order(response.data);

    this.orders.push(order);
    this.state = SUCCSESS;
  }

  @computed get isLoading() {
    return this.state === LOADING
  }

  @computed get isError() {
    return this.state === LOADING
  }

  @action
  fetchOrders = () => {
    if (!this.rootStore.authStore.isAuthenticated) {
      throw new Error('User is not authenticated');
    }
    this.state = LOADING;
    this.error = undefined;
    this.orders = [];

    api.get<IOrderResponse[]>(ORDERS_URL)
    .then(response => this.fetchOrdersSuccess(response.data))
    .catch(response => this.fetchOrdersError(response.data))
  }

  @action
  fetchOrdersSuccess = (ordersObj: IOrderResponse[]) => {
    this.orders = ordersObj.map(orderObj => new Order(orderObj))
    this.state = SUCCSESS;
    this.error = undefined;
  }

  @action
  fetchOrdersError = (error: string) => {
    this.state = ERROR;
    this.error = error;
  }
}

export default OrdersStore;
