import React from 'react';
import { observer } from 'mobx-react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import rootStoreContext from '../../context/rootStoreContext';
import {
    NOT_UPLOADED,
    LOADING,
    ERROR
} from '../../store/OrdersStore/consts';
import IOrder from '../../types/order';

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
        if (this.context.ordersStore.state === LOADING) {
            return <Spinner />
        }

        if (this.context.ordersStore.state === ERROR) {
            return <p>{this.context.ordersStore.error}</p>
        }

        const orders = this.context.ordersStore.orders.map((order: IOrder) => (
            <Order key={order.id}
                   totalPrice={order.totalPrice}
                   ingredients={order.ingredients}/>
        ));

        return (
            <div>{orders}</div>
        );
    }
}

export default (withErrorHandler(Orders, axios));
