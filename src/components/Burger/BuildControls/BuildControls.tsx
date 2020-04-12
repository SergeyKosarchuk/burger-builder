import React from 'react';
import styled from 'styled-components';

import BuildControl from './BuildControl/BuildControl';
import { IBuildControlsProps } from './types';
import { observer } from 'mobx-react';
import Ingredient from '../../../types/customingredient';
import rootStoreContext from '../../../context/rootStoreContext';
import { count } from '../../../utils';

const StyledBuildControls = styled.div`
  width: 100%;
  background-color: #CF8F2E;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 10px 0;
`;

const OrderButton = styled.button`
  background-color: #DAD735;
  outline: none;
  cursor: pointer;
  border: 1px solid #966909;
  color: #966909;
  font-family: inherit;
  font-size: 1.2em;
  padding: 15px 30px;
  box-shadow: 2px 2px 2px #966909;

  :hover, :active {
    background-color: #A0DB41;
    border: 1px solid #966909;
    color: #966909;
  };
  :disabled {
    background-color: #C7C6C6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888
  };
`;

@observer
export default class BuildControls extends React.Component<IBuildControlsProps> {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>

  isIngredientDisabled = (ingredient: Ingredient): boolean => {
    return !count(this.props.ingredients, (item: Ingredient) => item._id, ingredient)
  }

  render () {
    const {
      isAuthenticated,
      ingredients,
      ingredientAdded,
      ingredientRemoved,
      price,
      orderCompleteHandler,
    } = this.props
    const buttonMessage = isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER';
    const controls = this.context.ingredientsStore.ingredients.map(ingredient => {
      return <BuildControl
        key={ingredient._id}
        label={ingredient.name}
        added={() => ingredientAdded(ingredient)}
        removed={() => ingredientRemoved(ingredient)}
        disabled={this.isIngredientDisabled(ingredient)}/>
    })

    return (
      <StyledBuildControls>
        <p>Current price: <strong>{price}</strong></p>
        {controls}
        <OrderButton
          disabled={!ingredients.length}
          onClick={orderCompleteHandler}
          >{buttonMessage}
        </OrderButton>
      </StyledBuildControls>
    );
  }
}
