import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${(props) => props.type === 'accept' ? 'green' : 'red'};
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
`;

export default function button (props) {
    return <Button onClick={props.clicked} type={props.type}>{props.children}</Button>
}