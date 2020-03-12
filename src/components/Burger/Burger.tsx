import React from 'react';
import styled from 'styled-components';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { BREAD_BOTTOM, BREAD_TOP } from '../../consts/ingredients';
import { IBurgerProps } from './types';

const Burger = styled.div`
    width: 100%;
    margin: auto;
    height: 250px;
    overflow: scroll;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;

    @media (min-width: 1000px) and (min-height: 700px) {
        width: 700px;
        height: 600px;
    }
    @media (min-width: 500px) and (min-height: 401px) {
        width: 450px;
        height: 400px;
    }
    @media (min-width: 500px) and (max-height: 400px) {
        width: 350px;
        height: 300px;
    }
`;

const BreadTop = <BurgerIngredient type={BREAD_TOP} key={BREAD_TOP}/>;
const BreadBottom = <BurgerIngredient type={BREAD_BOTTOM} key={BREAD_BOTTOM}/>;

export default function burger({ingredients}: IBurgerProps) {
    let selected_ingredients = [<p key='NO INGREDIENTS'>Add ingredients</p>];

    if (ingredients.length) {
        selected_ingredients = ingredients.map(
            (ingredient, index) => <BurgerIngredient type={ingredient} key={ingredient + index}/>);
    }

    const burger_ingredients = [BreadTop, ...selected_ingredients, BreadBottom];
    return <Burger>{burger_ingredients}</Burger>
}