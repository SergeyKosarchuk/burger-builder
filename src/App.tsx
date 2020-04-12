import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { observer } from 'mobx-react';
import rootStoreContext from './context/rootStoreContext';
import Login from './containers/Auth/Login';
import Registration from './containers/Auth/Registration';

@observer
export class App extends React.Component {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  componentDidMount () {
    if (!this.context.authStore.isAuthenticated) {
      this.context.authStore.authCheckState();
    }
  }

  renderAuthenticated = () => {
    return (
    <Layout>
        <Switch>
            <Route key='/checkout' path='/checkout'><Checkout /></Route>
            <Route key='/orders' path='/orders'> <Orders /></Route>
            <Route key='/' path='/' exact><BurgerBuilder /></Route>
            <Route key='/logout' path='/logout'>
                <Logout onLogout={() => this.context.authStore.logout()}/>
            </Route>
            <Redirect key='redirect' to='/' />
        </Switch>
    </Layout>);
  }

  renderUnAuthenticated = () => {
    return (
    <Layout>
        <Switch>
        <Route key='/' path='/' exact><BurgerBuilder /></Route>
        <Route key='/login' path='/login'><Login/></Route>
        <Route key='/registration' path='/registration'><Registration/></Route>
        <Redirect key='redirect' to='/' />
        </Switch>
    </Layout>);
  }

  render () {
    const isAuthenticated = this.context.authStore.isAuthenticated;

    if (isAuthenticated) {
        return this.renderAuthenticated();
    }

    return this.renderUnAuthenticated();
  }
}

export default App;
