import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurderBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/Auth/actions';

class App extends React.Component{

    componentDidMount () {
        this.props.authCheckState();
    }

    render () {
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
}

const mapDispatchToProps = dispatch => ({
    authCheckState: () => dispatch(authCheckState())
});

export default connect(null, mapDispatchToProps)(App);
