import React from 'react';
import styled from 'styled-components';

import Ingredient from '../../../types/customingredient';

const Summary = styled.span`
  text-transform: capitalize;
`;

type SummeryEntryProps = {
  ingredient: Ingredient,
  count: number
}

export default function SummeryEntry(props: SummeryEntryProps) {
  const { ingredient, count } = props;
  return <li key={ingredient._id}><Summary>{ingredient.name}: {count}</Summary></li>
}
