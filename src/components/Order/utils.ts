import Ingredient from '../../types/ingredient';

type IngredientCounts = {
    [name: string]: number
};

export function countIngredients (ingredients: Ingredient[]): IngredientCounts {
    const counts: IngredientCounts = {};

    for (const ingr of ingredients) {
        if (counts[ingr]) {
            counts[ingr] += 1;
        }
        else {
            counts[ingr] = 1
        }
    }

    return counts;
}
