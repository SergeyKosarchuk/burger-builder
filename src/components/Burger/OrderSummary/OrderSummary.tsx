import React from 'react';
import Button from '../../UI/Button/Button';

import SummeryList from './SummeryList';
import IIngredient from '../../../types/ingredient';

type orderSummeryProps = {
  ingredients: IIngredient[],
  acceptClicked(): void,
  cancelClicked(): void,
  totalPrice: string,
}

export default function orderSummery (props: orderSummeryProps) {
  const { ingredients, acceptClicked, cancelClicked, totalPrice } = props;

  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger</p>
      <SummeryList ingredients={ingredients}/>
      <p><strong>Total price: {totalPrice}</strong></p>
      <p>Continue to checkout?</p>
      <Button type='cancel' clicked={cancelClicked}>Cancel</Button>
      <Button type='accept' clicked={acceptClicked}>Continue</Button>
    </>
  )
}
