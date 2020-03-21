import React from 'react';
import styled from 'styled-components';

import Burger from '../../Burger/Burger'
import Button, { ACCEPT_TYPE } from '../../UI/Button/Button'
import Ingredient from '../../../types/ingredient';

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

type checkoutSummaryProps = {
  ingredients: Ingredient[],
  totalPrice: string,
  checkoutCancelled(): void,
  checkoutContinued(): void,
}

const checkoutSummary = ( props: checkoutSummaryProps ) => {
  const { ingredients, checkoutCancelled, checkoutContinued, totalPrice } = props;

  return (
    <StyledSummary>
      <h1>We hope it tastes well!</h1>
      <BurgerInfo>
        <Burger ingredients={ingredients}/>
        <h2>Total Price: {totalPrice}</h2>
      </BurgerInfo>
      <Button clicked={checkoutCancelled}>CANCEL</Button>
      <Button type={ACCEPT_TYPE} clicked={checkoutContinued}>CONTINUE</Button>
    </StyledSummary>
  );
}

export default checkoutSummary;
