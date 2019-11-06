import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: {},
        totalPrice: null,
    }

    componentDidMount() {
        if ( this.props.location.state ) {
            this.setState({
                ingredients: this.props.location.state.ingredients,
                totalPrice: this.props.location.state.totalPrice
            })
        }
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.path + '/contact-data')
    }

    render () {
        const { ingredients } = this.state;

        return (
            <div>
                <CheckoutSummary ingredients={ingredients}
                                checkoutCancelled={this.checkoutCanceledHandler}
                                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'}>
                    <ContactData />
                </Route>
            </div>
        );
    }
}

export default withRouter(Checkout);