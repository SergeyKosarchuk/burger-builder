import AuthStore from './AuthStore/store';
import OrdersStore from './OrdersStore/store';
import BurgerBuilderStore from './BurgerBuilderStore/store';
import IngredientsStore from './IngredientsStore/store';

export interface IRootStore {
  authStore: AuthStore;
  ordersStore: OrdersStore;
  burgerBuilderStore: BurgerBuilderStore;
  ingredientsStore: IngredientsStore;
}

class RootStore implements IRootStore {
  authStore: AuthStore;
  ordersStore: OrdersStore;
  burgerBuilderStore: BurgerBuilderStore;
  ingredientsStore: IngredientsStore;

  constructor (){
    this.authStore = new AuthStore();
    this.ordersStore = new OrdersStore(this);
    this.burgerBuilderStore = new BurgerBuilderStore(this);
    this.ingredientsStore = new IngredientsStore();
  }
}

export default new RootStore();
