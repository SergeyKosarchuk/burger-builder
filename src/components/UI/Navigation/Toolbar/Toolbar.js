import React from 'react';
import styled from 'styled-components';
import Logo from '../../../Logo/Logo';

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
    height: 100%;
`;

export default function  toolbar (props) {
    return (
        <Toolbar>
            <div>MENU</div>
            <Logo>LOGO</Logo>
            <Nav>...</Nav>
        </Toolbar>
    );
}