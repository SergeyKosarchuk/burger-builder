import React from 'react';
import styled from 'styled-components';

import BuildControl from './BuildControl/BuildControl';
import { SALAD, CHEESE, BACON, MEAT } from '../../../consts/ingredients';
import { IBuildControlsProps } from './types';
import Ingredient from '../../../types/ingredient';

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

type Control = {
    label: string,
    type: Ingredient
}

const controls: Control[] = [
    { label: 'Salad', type: SALAD },
    { label: 'Cheese', type: CHEESE },
    { label: 'Bacon', type: BACON },
    { label: 'Meat', type: MEAT },
];

export default function buildControls (props: IBuildControlsProps) {
    const buttonMessage = props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER';
    const buildControls = controls.map(control => (
        <BuildControl
                    key={control.type}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled.includes(control.type)} />
    ))

    return (
        <BuildControls>
            <p>Current price: <strong>{props.price}</strong></p>
            {buildControls}
            <OrderButton
                disabled={!props.ingredientsSelected}
                onClick={props.orderCompleteHandler}
                >{buttonMessage}
            </OrderButton>
        </BuildControls>
    );
}