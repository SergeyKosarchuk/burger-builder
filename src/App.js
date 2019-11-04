import React from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuildier/BurderBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/add-burger'>
              <BurgerBuilder />
            </Route>
            <Route path='/checkout'>
              <Checkout />
            </Route>
            <Route path='*'>
              <Redirect to='/add-burger'/>
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
