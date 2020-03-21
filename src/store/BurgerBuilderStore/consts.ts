import { SALAD, CHEESE, BACON, MEAT } from "../../consts/ingredients";

const NOT_UPLOADED = 'not_uploaded';
const LOADING = 'loading';
const ERROR = 'error';
const SUCCSESS = 'succsess'

const STARTING_PRICE = 12;
const INGREDIENT_PRICES = {
  [SALAD]: 1,
  [CHEESE]: 2,
  [BACON]: 3,
  [MEAT]: 4
}

export {
  STARTING_PRICE,
  INGREDIENT_PRICES,
  NOT_UPLOADED,
  LOADING,
  ERROR,
  SUCCSESS
};
