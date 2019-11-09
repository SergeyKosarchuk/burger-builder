import React from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: [],
        isLoading: false,
    }

    componentDidMount () {
        this.setState({isLoading: true})
        axios.get('orders/.json')
        .then((response) => {
            const orders = Object.entries(response.data).map( ([id, order]) => {
                return {id: id, totalPrice: order.totalPrice, ingredients: order.ingredients}
            })
            this.setState({orders: orders, isLoading: false})
        })
        .catch (error => {
            this.setState({isLoading: false})
        })
    }

    render () {
        let orders = null;

        if ( this.state.isLoading ) {
            orders = <Spinner />
        } else {
            orders = this.state.orders.map(order => {
                return <Order key={order.id} totalPrice={order.totalPrice.toFixed(2)} ingredients={order.ingredients}/>
            })
        }

        return (
            <div>{orders}</div>
        );
    }
}

export default withErrorHandler(Orders, axios);