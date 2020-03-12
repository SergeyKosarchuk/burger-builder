import React from 'react';
import styled from 'styled-components';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToogle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const Toolbar = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #703B09;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index:  90;
`;

const Nav = styled.nav`
    @media (max-width: 499px) {
        display: none;
    }
`;

type toolbarProps = {
    menuOpened(): void,
    isAuthenticated: boolean
}

export default function toolbar ({ menuOpened, isAuthenticated }: toolbarProps) {
    return (
        <Toolbar>
            <SideDrawerToogle clicked={menuOpened} />
            <Logo/>
            <Nav>
                <NavigationItems isAuthenticated={isAuthenticated}/>
            </Nav>
        </Toolbar>
    );
}