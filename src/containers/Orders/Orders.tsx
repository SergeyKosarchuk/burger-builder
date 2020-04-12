import React from 'react';
import { observer } from 'mobx-react';

import api from '../../api';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import rootStoreContext from '../../context/rootStoreContext';
import IOrder from '../../types/order';
import { NOT_UPLOADED } from '../../consts/states';

@observer
class Orders extends React.Component<{}, {}> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  componentDidMount () {
    if (this.context.ordersStore.state === NOT_UPLOADED){
      this.context.ordersStore.fetchOrders();
    }
  }

  render () {
    if (this.context.ordersStore.isLoading) {
      return <Spinner />
    }

    if (this.context.ordersStore.isError) {
      return <p>{this.context.ordersStore.error}</p>
    }

    const orders = this.context.ordersStore.orders.map((order: IOrder) => (
      <Order key={order._id} order={order}/>
    ));

    return (
      <div>{orders}</div>
    );
  }
}

export default (withErrorHandler(Orders, api));
