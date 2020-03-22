import { observable, action } from 'mobx';
import axios from '../../axios-orders';
import { ORDERS_URL } from '../../consts/urls';
import IOrder from '../../types/order';
import { FetchedOrders, IOrderData as IContactData } from './types';
import { IRootStore } from '../store';
import { OrdersState } from './types';
import { UPLOADED, LOADING, ERROR, NOT_UPLOADED } from './consts';


class OrdersStore {
  @observable orders: IOrder[] = [];
  @observable state: OrdersState = NOT_UPLOADED;
  @observable error?: string = undefined;

  constructor(private rootStore: IRootStore){}

  @action
  saveOrder = async (contactData: IContactData) => {
    const token = this.rootStore.authStore.token;
    const orderData = {
      ingredients: this.rootStore.burgerBuilderStore.ingredients,
      totalPrice: this.rootStore.burgerBuilderStore.totalPrice,
      customer: {
        userId: this.rootStore.authStore.userId,
        name: contactData.name,
        address: {
          street: contactData.street,
          postalCode: contactData.postalCode,

        },
        email: contactData.email,
      },
      created: new Date()
    }

    this.state = LOADING;
    const response = await axios.post(`orders/.json?auth=${token}`, orderData);
    const newOrder = {
      id: response.data.name,
      ingredients: orderData.ingredients,
      totalPrice: orderData.totalPrice,
    }

    this.orders.push(newOrder);
    this.state = UPLOADED;
    return newOrder;
  }

  @action
  fetchOrders = () => {
    if (!this.rootStore.authStore.isAuthenticated) {
      throw new Error('User is not authenticated');
    }
    this.state = LOADING;
    this.error = undefined;
    this.orders = [];

    const token = this.rootStore.authStore.token;
    const userId = this.rootStore.authStore.userId;
    const queryParams = `?auth=${token}&orderBy="customer/userId"&equalTo="${userId}"`
    axios.get(ORDERS_URL + queryParams)
    .then(response => this.fetchOrdersSuccess(response.data))
    .catch(response => this.fetchOrdersError(response.message))
  }

  @action.bound
  fetchOrdersSuccess = (data: FetchedOrders) => {
    this.orders = Object.entries(data).map(([id, order]) => ({
      id: id,
      totalPrice: order.totalPrice,
      ingredients: order.ingredients
    }))

    this.state = UPLOADED;
    this.error = undefined;
  }
  @action.bound
  fetchOrdersError = (error: string) => {
    this.state = ERROR;
    this.error = error;
  }
}

export default OrdersStore;
