import React from 'react';

import {
  SALAD,
  BACON,
  CHEESE,
  MEAT
} from '../../../consts/ingredients';
import SummeryEntry from './SummeryEntry';
import Ingredient from '../../../types/ingredient';
import { count } from '../../../utils';

type SummeryListProps = {
  ingredients: Ingredient[]
}

export default function SummeryList(props: SummeryListProps) {
  const { ingredients } = props;
  const saladCount = count(SALAD, ingredients);
  const baconCount = count(BACON, ingredients);
  const cheeseCount = count(CHEESE, ingredients);
  const meatCount = count(MEAT, ingredients);

  return (
    <ul>
      <SummeryEntry ingredient={SALAD} count={saladCount}/>
      <SummeryEntry ingredient={BACON} count={baconCount}/>
      <SummeryEntry ingredient={CHEESE} count={cheeseCount}/>
      <SummeryEntry ingredient={MEAT} count={meatCount}/>
    </ul>
  );
}
