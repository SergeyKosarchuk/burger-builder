import React from 'react';
import styled from "styled-components";

const Summary = styled.span`
    text-transform: capitalize;
`;

export default function orderSummary({ingredients}) {
    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger</p>
            <ul>{Object.entries(ingredients).map(([name, count]) => <li key={name}><Summary>{name}</Summary> {count}</li>)}</ul>
            <p>Continue to checkout?</p>
        </>
    )
}