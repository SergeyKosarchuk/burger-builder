import React from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const MIN_PRICE = 4;
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 2,
    cheese: 2.5,
    meat: 4
};
const STARTING_INGREDIENTS = {
    salad: 1,
    bacon: 1,
    cheese: 2,
    meat: 2
};

class BurgerBuilder extends React.Component{
    state = {
        ingredients: Object.assign({}, STARTING_INGREDIENTS),
        totalPrice: MIN_PRICE,
    };

    addIngredientHandler = (type) => {
        this.setState((prevSate) => {
            prevSate.ingredients[type] += 1;

            if ( prevSate.ingredients[type] > STARTING_INGREDIENTS[type] ){
                prevSate.totalPrice += INGREDIENT_PRICES[type];
            }
            return prevSate;
        })
    };

    removeIngredientHandler = (type) => {
        this.setState((prevSate) => {
            if ( prevSate.ingredients[type] > 0 ) {
                const new_price = prevSate.totalPrice - INGREDIENT_PRICES[type];

                prevSate.ingredients[type] -= 1;

                if ( new_price >= MIN_PRICE ) {
                    prevSate.totalPrice = new_price;
                }
            }
            return prevSate;
        })
    };

    render(){
        const disabledIngredients = Object.keys(this.state.ingredients).filter((ing) => this.state.ingredients[ing] <= 0);

        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledIngredients}
                               price={this.state.totalPrice}
                />
            </>
        )
    }
}

export default BurgerBuilder;