import React from 'react';
import styled from 'styled-components';

const ACCEPT_TYPE = 'accept'

const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${(props) => props.type === ACCEPT_TYPE ? 'green' : 'red'};
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
`;

export default function button ( {clicked, type, children} ) {
    return <Button onClick={clicked} type={type}>{children}</Button>
}

export { ACCEPT_TYPE };