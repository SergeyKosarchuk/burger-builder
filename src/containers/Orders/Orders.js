import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/Orders/actions';

class Orders extends React.Component {
    componentDidMount () {
        if (this.props.needFetchOrders){
            this.props.fetchOrders(this.props.token)
        }
    }

    render () {
        if (this.props.isLoading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <p>{this.props.error}</p>
        }

        const orders = this.props.orders.map(order => (
            <Order key={order.id}
                   totalPrice={order.totalPrice.toFixed(2)}
                   ingredients={order.ingredients}/>
        ));

        return (
            <div>{orders}</div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    orders: state.orders.orders,
    error: state.orders.error,
    isLoading: state.orders.isLoading,
    needFetchOrders: state.orders.needFetchOrders});
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: token => dispatch(fetchOrders(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));