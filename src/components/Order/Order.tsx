import React from 'react';
import styled from 'styled-components';

import Order from '../../types/order';
import SummeryList from '../Burger/OrderSummary/SummeryList';

const OrderWrapper = styled.div`
  width: 100%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const Span = styled.span`
  text-transform: capitalize;
  display: inline-block;
  margin: 0 5px;
  padding: 5px;
  border: 1px solid #ccc;
`;

type OrderProps = {
  order: Order,
}

const order = ({ order }: OrderProps) => {
  return (
    <OrderWrapper>
      <p>{order.burger.name}</p>
      <p>Created at: {order.createdAt.toLocaleDateString()}</p>
      <SummeryList ingredients={order.burger.ingredients}></SummeryList>
      <p>Price: <Span>{order.price}</Span> USD</p>
    </OrderWrapper>
  );
};

export default order;
