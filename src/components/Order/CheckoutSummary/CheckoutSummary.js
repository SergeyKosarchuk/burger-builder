import React from 'react';
import styled from 'styled-components';

import Burger from '../../Burger/Burger'
import Button, { ACCEPT_TYPE } from '../../UI/Button/Button'

const StyledSummary = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
        width: 500px;
    }
`;

const BurgerInfo = styled.div`
    width: 100%;
    margin: auto;
`;

const checkoutSummary = ( { ingredients } ) => {
    return (
        <StyledSummary>
            <h1>We hope it tastes well!</h1>
            <BurgerInfo>
                <Burger ingredients={ingredients}/>
            </BurgerInfo>
            <Button clicked>CANCEL</Button>
            <Button type={ACCEPT_TYPE} clicked>CONTINUE</Button>
        </StyledSummary>
    );
}

export default checkoutSummary;