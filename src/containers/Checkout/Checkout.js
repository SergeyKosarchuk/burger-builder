import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends React.Component {
    render () {
        const { ingredients, totalPrice } = this.props;

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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(
    mapStateToProps,
    null
)(withRouter(Checkout));