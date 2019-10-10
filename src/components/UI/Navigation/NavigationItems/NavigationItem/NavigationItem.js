import React from 'react';
import styled from 'styled-components';

const NavigationItem = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    cursor: pointer;

    @media (min-width: 500px) {
        margin: 0;
        box-sizing: border-box;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        cursor: pointer;
    }
`;

const A = styled.a`
    color: ${(props) => props.active ? '#40A4C8' : '#8F5C2C'};
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;

    @media (min-width: 500px) {
        color: white;
        text-decoration: none;
        height: 100%;
        padding: 16px 10px;
        background-color: ${(props) => props.active ? '#8F5C2C' : '#703b09'};
        border-bottom: ${(props) => props.active ? '4px solid #40A4C8' : ''};

        :hover {
            background-color: #8F5C2C;
            border-bottom: 4px solid #40A4C8;
        }
    }
`;

export default function navigationItem ({children, link, active}) {
    return <NavigationItem><A active={active} href={link}>{children}</A></NavigationItem>
}