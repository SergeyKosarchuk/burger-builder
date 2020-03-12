import React from 'react';
import axios from '../../axios-orders';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { addIngredient, deleteIngredient, initIngredients } from '../../store/BurgerBuilder/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spiner from '../../components/UI/Spinner/Spiner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Ingredient from '../../types/ingredient';
import { RootState } from '../../store/store';
import { getDisabledIngredients } from './utils';

interface BurgerBuilderProps extends RouteComponentProps {
    isAuthenticated: boolean,
    initIngredients(): void,
    ingredients: Ingredient[],
    totalPrice: number,
    isLoading: boolean,
    addIngredient(ingredient: Ingredient): void,
    deleteIngredient(ingredient: Ingredient): void,
    needFetchIngredients: boolean
};

interface BurgerBuilderState {
    showOrderConfirm: boolean,
}

export class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {
    state = {
        showOrderConfirm: false,
    };

    orderCompleteHandler = () => {
        if (this.props.isAuthenticated){
            this.setState({showOrderConfirm: true})
        } else {
            this.props.history.push({pathname: '/registration'})
        }

    };

    orderCancelHandler = () => {
        this.setState({showOrderConfirm: false});
    }

    orderAcceptClickedHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }

    orderCancelClickedHandler = () => {
        this.setState({showOrderConfirm: false});
    }

    componentDidMount () {
        if (this.props.needFetchIngredients){
            this.props.initIngredients();
        }
    }

    render(){
        const showOrderConfirm = this.state.showOrderConfirm;
        const { ingredients, totalPrice, isLoading } = this.props;
        const disabledIngredients = getDisabledIngredients(ingredients);
        const ingredientsSelected = !!ingredients.length
        let orderSummery = <OrderSummary ingredients={ingredients}
                                         totalPrice={totalPrice.toFixed(2)}
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
                               price={totalPrice.toFixed(2)}
                               ingredientsSelected={ingredientsSelected}
                               orderCompleteHandler={this.orderCompleteHandler}
                               isAuthenticated={this.props.isAuthenticated}
                />
            </>
        )
    }
}

const dispatchStateToProps = (dispatch: any) => {
    return {
        addIngredient: (ingredient: Ingredient) => dispatch(addIngredient(ingredient)),
        deleteIngredient: (ingredient: Ingredient) => dispatch(deleteIngredient(ingredient)),
        initIngredients: () => dispatch(initIngredients())
    };
};

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.burgerBuilder.isLoading,
        isError: !!state.burgerBuilder.error,
        totalPrice: state.burgerBuilder.totalPrice,
        ingredients: state.burgerBuilder.ingredients,
        needFetchIngredients: state.burgerBuilder.needFetchIngredients,
        isAuthenticated: !!state.auth.token,
    };
};

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(withRouter(withErrorHandler(BurgerBuilder, axios)));
