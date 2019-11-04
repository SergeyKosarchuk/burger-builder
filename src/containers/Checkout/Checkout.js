import React from 'react';
import { withRouter } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
    state = {
        ingredients: {}
    }

    componentDidMount() {
        const queryString = require('query-string');
        const params = queryString.parse(this.props.location.search);
        this.setState({ingredients: params})
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        const { ingredients } = this.state;

        return (
            <div>
                <CheckoutSummary ingredients={ingredients}
                                 checkoutCancelled={this.checkoutCanceledHandler}
                                 checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        );
    }
}

export default withRouter(Checkout);