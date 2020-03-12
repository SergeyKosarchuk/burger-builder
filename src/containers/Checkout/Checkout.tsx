import React from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { RootState } from '../../store/store';
import Ingredient from '../../types/ingredient';

interface CheckoutStoreProps {
    ingredients: Ingredient[],
    totalPrice: number
}

interface CheckoutProps extends CheckoutStoreProps, RouteComponentProps<{}>{

}

interface CheckoutState {
    ingredients: Ingredient[],
    totalPrice: string
}

class Checkout extends React.Component<CheckoutProps, CheckoutState> {
    render () {
        const { ingredients, totalPrice, match, history } = this.props;

        return (
            <div>
                <CheckoutSummary ingredients={ingredients}
                                checkoutCancelled={() => history.goBack()}
                                checkoutContinued={() => history.push(match.path + '/contact-data')}/>
                <Route path={match.path + '/contact-data'}>
                    <ContactData ingredients={ingredients}
                                 totalPrice={totalPrice.toFixed(2)}
                                 onComplete={() => history.push('/')}/>
                </Route>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): CheckoutStoreProps => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));