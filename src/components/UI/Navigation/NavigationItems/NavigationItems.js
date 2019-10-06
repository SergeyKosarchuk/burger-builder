import React from 'react';
import styled from 'styled-components';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const NavigationItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    height: 100%;
`;


export default function navigationItems (props) {
    return (
    <NavigationItems>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </NavigationItems>)
}