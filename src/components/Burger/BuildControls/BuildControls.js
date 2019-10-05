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

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

export default function buildControls ({ingredientAdded, ingredientRemoved, disabled, price}) {
    return (
        <BuildControls>
            <p>Current price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map((control) => <BuildControl key={control.type}
                                                     label={control.label}
                                                     added={() => ingredientAdded(control.type)}
                                                     removed={() => ingredientRemoved(control.type)}
                                                     disabled={disabled.includes(control.type)}
            />)}
        </BuildControls>
    );
}