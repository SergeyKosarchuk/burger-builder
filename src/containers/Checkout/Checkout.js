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

    render () {
        const { ingredients, totalPrice } = this.state;

        return (
            <div>
                <CheckoutSummary ingredients={ingredients}
                                checkoutCancelled={() => this.props.history.goBack()}
                                checkoutContinued={() => this.props.history.push(this.props.match.path + '/contact-data')}/>
                <Route path={this.props.match.path + '/contact-data'}>
                    <ContactData ingredients={ingredients}
                                 totalPrice={totalPrice}
                                 onComplete={() => this.props.history.push('/')}/>
                </Route>
            </div>
        );
    }
}

export default withRouter(Checkout);