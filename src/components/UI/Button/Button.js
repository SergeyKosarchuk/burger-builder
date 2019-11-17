import React from 'react';
import styled from 'styled-components';

const ACCEPT_TYPE = 'accept'

const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.color};
    outline: none;
    cursor: ${props => props.pointer};
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
`;

export default function button ( {clicked, type, children, disabled} ) {
    let color = type === ACCEPT_TYPE ? 'green' : 'read';
    let pointer = 'pointer';

    if (disabled){
        color = 'grey'
        pointer = 'not-allowerd'
    }

    return <Button onClick={clicked} color={color} pointer={pointer}>{children}</Button>
}

export { ACCEPT_TYPE };