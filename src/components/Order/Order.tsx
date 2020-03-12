import React from 'react';
import styled from 'styled-components';

import { countIngredients } from './utils';
import Ingredient from '../../types/ingredient';

const Order = styled.div`
    width: 100%;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    margin: 10px auto;
    box-sizing: border-box;
`;

const Span = styled.span`
    text-transform: capitalize;
    display: inline-block;
    margin: 0 5px;
    padding: 5px;
    border: 1px solid #ccc;
`;

type OrderProps = {
    totalPrice: string,
    ingredients: Ingredient[]
}

const order = ({totalPrice, ingredients}: OrderProps) => {
    const ingsCounts = countIngredients(ingredients)
    const totalSum = Object.entries(ingsCounts).map(([name, count]) => {
        return <Span key={name}>{name}: {count}</Span>
    });

    return (
        <Order>
            <p>Ingredients: {totalSum}</p>
            <p>Price: <strong>{totalPrice}</strong> USD</p>
        </Order>
    );
};

export default order;