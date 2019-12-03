import React from 'react';
import styled from 'styled-components';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const NavigationItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
    }
`;

export default function navigationItems (props) {
    return (
    <NavigationItems>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link='/registration'>Registration</NavigationItem>
    </NavigationItems>)
}