import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
    color: #40A4C8;

    &.active {
        background-color: #8F5C2C;
        border-bottom: 4px solid #40A4C8;
    }

    :hover {
        background-color: #8F5C2C;
        border-bottom: 4px solid #40A4C8;
    }

    @media (min-width: 500px) {
        color: white;
        text-decoration: none;
        height: 100%;
        padding: 16px 10px;
    }
`;

export default function navigationItem ({children, link}) {
    return <NavigationItem><StyledNavLink to={link} exact>{children}</StyledNavLink></NavigationItem>
}