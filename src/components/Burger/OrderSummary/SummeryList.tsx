import React from 'react';

import SummeryEntry from './SummeryEntry';
import Ingredient from '../../../types/customingredient';
import { count } from '../../../utils';
import { observer } from 'mobx-react';
import rootStoreContext from '../../../context/rootStoreContext';

type SummeryListProps = {
  ingredients: Ingredient[]
}


@observer
export default class SummeryList extends React.Component<SummeryListProps> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  render() {
    const { ingredients } = this.props;
    const ingredientCounter = (ingredient: Ingredient): number => {
      return count(ingredients, (item: Ingredient) => item._id, ingredient)
    }
    const summEntries = this.context.ingredientsStore.ingredients.map((ingredient, idx) => (
      <SummeryEntry
        ingredient={ingredient}
        key={idx}
        count={ingredientCounter(ingredient)}
      />
    ))

    return (
      <ul>
        {summEntries}
      </ul>
    );
    }
}
