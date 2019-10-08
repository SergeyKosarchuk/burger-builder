import React from 'react';
import styled from 'styled-components';
import BurgerLogo from '../../assets/images/burger-logo.png';

const Logo = styled.div`
    background-color: white;
    padding: 8px;
    height: ${(props) => props.heightValue ? props.heightValue : '80%'};
    box-sizing: border-box;
    border-radius: 5px;
`;

const Img = styled.img`
    height: 100%;
`;

export default function logo (props) {
    return (
    <Logo heightValue={props.heightValue}>
        <Img alt={props.alt ? props.alt : 'My Burger'} src={BurgerLogo}/>
    </Logo>)
}