import React from 'react';
import styled from 'styled-components';

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

const order = ( {totalPrice, ingredients} ) => {
    const ings = Object.entries(ingredients).map(([name, ammount]) => {
        return <Span key={name}>{name} ({ammount})</Span>
    })

    return (
        <Order>
            <p>Ingredients: {ings}</p>
            <p>Price: <strong>{totalPrice}</strong> USD</p>
        </Order>
    );
};

export default order;