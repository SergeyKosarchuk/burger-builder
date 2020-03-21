import { observable, action } from 'mobx';
import axios from '../../axios-orders';
import { ORDERS_URL } from '../../consts/urls';
import IOrder from '../../types/order';
import { FetchedOrders } from './types';
import { IRootStore } from '../store';
import { OrdersState } from './types';


class OrdersStore {
  @observable orders: IOrder[] = [];
  @observable state: OrdersState = 'not_uploaded';
  @observable error?: string = undefined;

  constructor(private rootStore: IRootStore){}

  @action
  fetchOrders = () => {
    if (this.rootStore.authStore.state !== 'authenticated') {
      throw new Error('User is not authenticated');
    }
    this.state = 'loading';
    this.error = undefined;
    this.orders = [];

    const token = this.rootStore.authStore.token;
    const userId = this.rootStore.authStore.userId;
    const queryParams = `?auth=${token}&orderBy="customer/userId"&equalTo="${userId}"`
    axios.get(ORDERS_URL + queryParams)
    .then(response => this.fetchOrdersSuccsess(response.data))
    .catch(this.fetchOrdersError)
  }

  @action.bound
  fetchOrdersSuccsess = (data: FetchedOrders) => {
    this.orders = Object.entries(data).map(([id, order]) => ({
      id: id,
      totalPrice: order.totalPrice,
      ingredients: order.ingredients
    }))

    this.state = 'uploaded';
    this.error = undefined;
  }
  @action.bound
  fetchOrdersError = (error: string) => {
    this.state = 'error';
    this.error = error;
  }
}

export default OrdersStore;
