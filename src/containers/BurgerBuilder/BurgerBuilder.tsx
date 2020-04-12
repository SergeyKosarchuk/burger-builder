import React from 'react';
import api from '../../api';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import rootStoreContext from '../../context/rootStoreContext';
import { NOT_UPLOADED } from '../../consts/states';
import { observer } from 'mobx-react';

interface BurgerBuilderState {
  showOrderConfirm: boolean,
}

@observer
export class BurgerBuilder extends React.Component<RouteComponentProps, BurgerBuilderState> {
  state = {
    showOrderConfirm: false,
  };
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  orderCompleteHandler = () => {
    if (this.context.authStore.isAuthenticated){
      this.setState({showOrderConfirm: true})
    } else {
      this.props.history.push({pathname: '/login'})
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
    if (this.context.burgerBuilderStore.state === NOT_UPLOADED){
      this.context.burgerBuilderStore.fetchBurger();
    }
    if (this.context.ingredientsStore.state === NOT_UPLOADED){
      this.context.ingredientsStore.fetchIngredients();
    }
  }

  render(){
    const showOrderConfirm = this.state.showOrderConfirm;
    const {
      ingredients,
      totalPrice,
      isLoading,
      addIngredient,
      deleteIngredient,
    } = this.context.burgerBuilderStore;
    const isAuthenticated = this.context.authStore.isAuthenticated;
    let orderSummery = <OrderSummary ingredients={ingredients}
                     totalPrice={totalPrice.toFixed(2)}
                     acceptClicked={this.orderAcceptClickedHandler}
                     cancelClicked={this.orderCancelClickedHandler}/>

    if (isLoading) {
      orderSummery = <Spinner />
    }

    return (
      <>
        <Modal show={showOrderConfirm} clicked={this.orderCancelHandler}>
          {orderSummery}
        </Modal>
        <Burger ingredients={ingredients}/>
        <BuildControls
          ingredients={ingredients}
          ingredientAdded={addIngredient}
          ingredientRemoved={deleteIngredient}
          price={totalPrice.toFixed(2)}
          orderCompleteHandler={this.orderCompleteHandler}
          isAuthenticated={isAuthenticated}
        />
      </>
    )
  }
}

export default withRouter(withErrorHandler(BurgerBuilder, api));
