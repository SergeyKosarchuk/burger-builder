import AuthStore from './AuthStore/store';
import OrdersStore from './OrdersStore/store';
import BurgerBuilderStore from './BurgerBuilderStore/store';

export interface IRootStore {
  authStore: AuthStore;
  ordersStore: OrdersStore;
  burgerBuilderStore: BurgerBuilderStore;
}

class RootStore implements IRootStore {
  authStore: AuthStore;
  ordersStore: OrdersStore;
  burgerBuilderStore: BurgerBuilderStore;

  constructor (){
    this.authStore = new AuthStore();
    this.ordersStore = new OrdersStore(this);
    this.burgerBuilderStore = new BurgerBuilderStore();
  }
}

export default new RootStore();
