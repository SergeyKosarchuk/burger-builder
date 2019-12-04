import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuildier/BurderBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Route path='/orders'>
            <Orders />
          </Route>
          <Route path='/registration'>
            <Auth />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/'>
            <BurgerBuilder />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
