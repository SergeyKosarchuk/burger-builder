import React from 'react';
import axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';


class BurgerBuilder extends React.Component{
    state = {
        minPrice: null,
        ingredients: {},
        startIngredients: null,
        totalPrice: null,
        showOrderConfirm: false,
        isLoading: false,
        ingredientPrices: null,
    };

    componentDidMount () {
        axios.get('start_ingredients/.json')
            .then(result => this.setState({ingredients: Object.assign({}, result.data), startIngredients: Object.assign({}, result.data)}))
        axios.get('min_price/.json')
            .then(result => this.setState({minPrice: result.data, totalPrice: result.data}))
        axios.get('ingredient_prices/.json')
            .then(result => this.setState({ingredientPrices: Object.assign(result.data)}))
    }

    addIngredientHandler = (type) => {
        this.setState((prevState) => {
            prevState.ingredients[type] += 1;

            if ( prevState.ingredients[type] > prevState.startIngredients[type] ){
                prevState.totalPrice += prevState.ingredientPrices[type];
            }
            return prevState;
        })
    };

    removeIngredientHandler = (type) => {
        this.setState((prevState) => {
            if ( prevState.ingredients[type] > 0 ) {
                const newPrice = prevState.totalPrice - prevState.ingredientPrices[type];

                prevState.ingredients[type] -= 1;

                if ( newPrice >= this.state.minPrice ) {
                    prevState.totalPrice = newPrice;
                }
            }
            return prevState;
        })
    };

    orderCompleteHandler = () => {
        this.setState({showOrderConfirm: true})
    };

    orderCancelHandler = () => {
        this.setState({showOrderConfirm: false});
    }

    orderAcceptClickedHandler = () => {
        const queryString = require('query-string');
        const query = queryString.stringify(this.state.ingredients);

        this.props.history.push({
            pathname: '/checkout',
            search: query,
        });
    }

    orderCancelClickedHandler = () => {
        this.setState({showOrderConfirm: false})
    }

    render(){
        const { ingredients, totalPrice, showOrderConfirm, isLoading } = this.state;
        const disabledIngredients = Object.keys(ingredients).filter((ing) => ingredients[ing] <= 0);
        const canCompleteOrder = !!Object.values(ingredients).reduce(
            (previousValue, currentItem) => previousValue + currentItem, 0);

        let orderSummery = <OrderSummary ingredients={ingredients}
                                         totalPrice={totalPrice ? totalPrice.toFixed(2) : null}
                                         acceptClicked={this.orderAcceptClickedHandler}
                                         cancelClicked={this.orderCancelClickedHandler}/>

        if (isLoading) {
            orderSummery = <Spiner />
        }

        return (
            <>
                <Modal show={showOrderConfirm} clicked={this.orderCancelHandler}>
                    {orderSummery}
                </Modal>
                <Burger ingredients={ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledIngredients}
                               price={totalPrice ? totalPrice.toFixed(2) : null}
                               canCompleteOrder={canCompleteOrder}
                               orderCompleteHandler={this.orderCompleteHandler}
                />
            </>
        )
    }
}

export default withRouter(withErrorHandler(BurgerBuilder, axios));