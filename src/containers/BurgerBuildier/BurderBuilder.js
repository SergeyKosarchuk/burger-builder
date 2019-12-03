import React from 'react';
import axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addIngredient, deleteIngredient, initIngredients } from '../../store/BurgerBuilder/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';


class BurgerBuilder extends React.Component{
    state = {
        showOrderConfirm: false,
    };

    orderCompleteHandler = () => {
        this.setState({showOrderConfirm: true})
    };

    orderCancelHandler = () => {
        this.setState({showOrderConfirm: false});
    }

    orderAcceptClickedHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }

    orderCancelClickedHandler = () => {
        this.setState({showOrderConfirm: false})
    }

    componentDidMount () {
        this.props.initIngredients()
    }

    render(){
        const showOrderConfirm = this.state.showOrderConfirm;
        const { ingredients, totalPrice, isLoading } = this.props;
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
                <BuildControls ingredientAdded={this.props.addIngredient}
                               ingredientRemoved={this.props.deleteIngredient}
                               disabled={disabledIngredients}
                               price={totalPrice ? totalPrice.toFixed(2) : null}
                               canCompleteOrder={canCompleteOrder}
                               orderCompleteHandler={this.orderCompleteHandler}
                />
            </>
        )
    }
}

const dispatchStateToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
        deleteIngredient: (ingredient) => dispatch(deleteIngredient(ingredient)),
        initIngredients: () => dispatch(initIngredients())
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.burgerBuilder.isLoading,
        isError: !!state.burgerBuilder.error,
        totalPrice: state.burgerBuilder.totalPrice,
        ingredients: state.burgerBuilder.ingredients,
    }
}

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(withRouter(withErrorHandler(BurgerBuilder, axios)));