import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurderBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/Auth/actions';
import { RootState } from './store/store';

interface AppStoreProps {
    isAuthenticated: boolean
}

interface AppDispatchProps {
    authCheckState(): void
}

interface AppProps extends AppStoreProps, AppDispatchProps {

}

export class App extends React.Component<AppProps>{

    componentDidMount () {
        this.props.authCheckState();
    }

    render () {
        const unAuthenticatedRoutes = [
            <Route key='/' path='/' exact><BurgerBuilder /></Route>,
            <Route key='/registration' path='/registration'><Auth /></Route>,
            <Redirect key='redirect' to='/' />
        ]

        const authenticatedRoutes = [
            <Route key='/checkout' path='/checkout'><Checkout /></Route>,
            <Route key='/orders' path='/orders'><Orders /></Route>,
            <Route key='/' path='/' exact><BurgerBuilder /></Route>,
            <Route key='/logout' path='/logout'><Logout /></Route>,
            <Redirect key='redirect' to='/' />
        ]

        return (
            <div>
                <Layout>
                    <Switch>
                        {this.props.isAuthenticated ? authenticatedRoutes : unAuthenticatedRoutes}
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): AppStoreProps => ({isAuthenticated: !!state.auth.token});

const mapDispatchToProps = (dispatch: any) => ({
    authCheckState: () => dispatch(authCheckState())
});

export default connect<AppStoreProps, AppDispatchProps, {}, RootState>
(mapStateToProps, mapDispatchToProps)(App);