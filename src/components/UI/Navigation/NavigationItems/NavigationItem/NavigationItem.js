import React from 'react';
import styled from 'styled-components';

const NavigationItem = styled.li`
    margin: 0;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
`;

const A = styled.a`
    color: white;
    text-decoration: none;
    height: 100%;
    padding: 16px 10px;
    box-sizing: border-box;
    display: block;
    color: white;
    background-color: ${(props) => props.active ? '#8F5C2C' : ''};
    border-bottom: ${(props) => props.active ? '4px solid #40A4C8' : ''};

    :hover {
        background-color: #8F5C2C;
        border-bottom: 4px solid #40A4C8;
    }
`;

export default function navigationItem ({children, link, active}) {
    return <NavigationItem><A active={active} href={link}>{children}</A></NavigationItem>
}