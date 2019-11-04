import React from 'react';
import styled from "styled-components";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    render () {
        const { ingredients } = this.state;

        return (
            <div>
                <CheckoutSummary ingredients={ingredients}/>
            </div>
        );
    }
}