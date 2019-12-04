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
    let authLink = null;

    if (props.isAuthenticated){
        authLink = <NavigationItem link='/logout'>Log out</NavigationItem>;
    }
    else {
        authLink = <NavigationItem link='/registration'>Registration</NavigationItem>
    }

    return (
    <NavigationItems>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {authLink}
    </NavigationItems>)
}