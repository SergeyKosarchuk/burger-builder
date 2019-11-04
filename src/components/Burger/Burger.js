import React from 'react';
import styled from "styled-components";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

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

export default function burger({ingredients}) {
    let burger_ingredients = [<BurgerIngredient type='bread-top' key='bread-top-1'/>];

    for (let [name, count] of Object.entries(ingredients)){
        for (let i = 0; i < count; i++) {
            burger_ingredients.push(<BurgerIngredient type={name} key={name + i}/>);
        }
    }

    burger_ingredients.push(<BurgerIngredient type='bread-bottom' key='bread-bottom-1'/>);
    const msg = Object.values(ingredients).reduce((total, current) => total + current, 0) ? '' : 'Add ingredients';
    return <Burger>{burger_ingredients}<p>{msg}</p></Burger>
}