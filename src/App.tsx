import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurderBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { observer } from 'mobx-react';
import rootStoreContext from './context/rootStoreContext';

@observer
export class App extends React.Component {
    static contextType = rootStoreContext;
    context!: React.ContextType<typeof rootStoreContext>;

    componentDidMount () {
        this.context.authStore.authCheckState();
    }

    renderAuthenticated () {
        return (
        <div>
            <Route key='/checkout' path='/checkout'><Checkout /></Route>
            <Route key='/orders' path='/orders'> <Orders /></Route>
            <Route key='/' path='/' exact><BurgerBuilder /></Route>
            <Route key='/logout' path='/logout'>
                <Logout onLogout={() => this.context.authStore.logout()}/>
            </Route>
            <Redirect key='redirect' to='/' />
        </div>);
    }

    renderUnAuthenticated () {
        return (
        <div>
            <Route key='/' path='/' exact><BurgerBuilder /></Route>
            <Route key='/registration' path='/registration'><Auth/></Route>
            <Redirect key='redirect' to='/' />
        </div>
        );
    }

    render () {
        const isAuthenticated = this.context.authStore.isAuthenticated;

        return (
            <div>
                <Layout>
                    <Switch>
                        {isAuthenticated ? this.renderAuthenticated() : this.renderUnAuthenticated()}
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;