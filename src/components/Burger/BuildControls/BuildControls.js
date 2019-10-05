import React from 'react';
import styled from "styled-components";
import BuildControl from "./BuildControl/BuildControl";


const BuildControls = styled.div`
    width: 100%;
    background-color: #CF8F2E;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 1px #ccc;
    margin: auto;
    padding: 10px 0;
`;

const OrderButton = styled.button`
    background-color: #DAD735;
    outline: none;
    cursor: pointer;
    border: 1px solid #966909;
    color: #966909;
    font-family: inherit;
    font-size: 1.2em;
    padding: 15px 30px;
    box-shadow: 2px 2px 2px #966909;
    
    :hover, :active {
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
    };
    :disabled {
        background-color: #C7C6C6;
        cursor: not-allowed;
        border: 1px solid #ccc;
        color: #888888
    };
`;

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

export default function buildControls ({ingredientAdded, ingredientRemoved, disabled, price, canCompleteOrder}) {
    return (
        <BuildControls>
            <p>Current price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map((control) => <BuildControl key={control.type}
                                                     label={control.label}
                                                     added={() => ingredientAdded(control.type)}
                                                     removed={() => ingredientRemoved(control.type)}
                                                     disabled={disabled.includes(control.type)}
            />)}
            <OrderButton disabled={!canCompleteOrder}>ORDER NOW</OrderButton>
        </BuildControls>
    );
}