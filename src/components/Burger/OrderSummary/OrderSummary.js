import React from 'react';
import styled from "styled-components";
import Button from '../../UI/Button/Button';

const Summary = styled.span`
    text-transform: capitalize;
`;

export default function orderSummary({ingredients, acceptClicked, cancelClicked, totalPrice}) {
    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger</p>
            <ul>{Object.entries(ingredients).map(([name, count]) => <li key={name}><Summary>{name}</Summary> {count}</li>)}</ul>
            <p><strong>Total price: {totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button type='cancel' clicked={cancelClicked}>Cancel</Button>
            <Button type='accept' clicked={acceptClicked}>Continue</Button>
        </>
    )
}