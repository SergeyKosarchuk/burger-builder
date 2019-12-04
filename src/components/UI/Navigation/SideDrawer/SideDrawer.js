import React from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';
import Backdrop from '../../Backdrop/Backdrop'

const SideDrawer = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${(props) => props.isOpen ? 'translateX(0)': 'translateX(-100%)'};

    @media (min-width: 500px) {
        display: none;
    }
`;

const LogoWrapper = styled.div`
    height: 11%;
    margin-bottom: 32px;
`;

export default function sideDrawer ({isOpen, closed, isAuthenticated}) {
    return (
        <>
            <Backdrop show={isOpen} clicked={closed}/>
            <SideDrawer isOpen={isOpen}>
            <LogoWrapper><Logo/></LogoWrapper>
            <nav>
                <NavigationItems isAuthenticated={isAuthenticated}/>
            </nav>
            </SideDrawer>
        </>
    );
}