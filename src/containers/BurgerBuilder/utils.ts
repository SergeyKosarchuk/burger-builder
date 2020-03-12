import Ingredient from "../../types/ingredient";
import { count } from "../../utils";
import { SELECTABLE_INGREDIENTS } from "../../consts/ingredients";

export function getDisabledIngredients(ingredients: Ingredient[]): Ingredient[] {
    const disabled: Ingredient[] = [];

    for (let ingredient of SELECTABLE_INGREDIENTS) {
        if (count(ingredient, ingredients) === 0) {
            disabled.push(ingredient)
        }
    }

    return disabled;
}