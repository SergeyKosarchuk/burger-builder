import React from 'react';
import styled from 'styled-components';

import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import { observer } from 'mobx-react';
import rootStoreContext from '../../context/rootStoreContext';

const Main = styled.main`
    margin-top: 72px;
`;

interface LayoutState {
    isSideDrawerOpen: boolean
}

@observer
class Layout extends React.Component<{}, LayoutState>{
    static contextType = rootStoreContext;
    context!: React.ContextType<typeof rootStoreContext>;

    state = {
        isSideDrawerOpen: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({isSideDrawerOpen: false})
    }

    sideDrawOpenHandler = () => {
        this.setState((prevState) => {
            return { isSideDrawerOpen: !prevState.isSideDrawerOpen }
        })
    }

    render(){
        const isAuthenticated = this.context.authStore.isAuthenticated;

        return (
            <>
                <Toolbar
                    menuOpened={this.sideDrawOpenHandler}
                    isAuthenticated={isAuthenticated}/>
                <SideDrawer
                    closed={this.sideDrawerClosedHandler}
                    isOpen={this.state.isSideDrawerOpen}
                    isAuthenticated={isAuthenticated}/>
                <Main>
                    {this.props.children}
                </Main>
            </>
        )
    }
}

export default Layout;
