import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import { RootState } from '../../store/store';

const Main = styled.main`
    margin-top: 72px;
`;

interface LayoutStoreProps {
    isAuthenticated: boolean
}

interface LayoutState {
    isSideDrawerOpen: boolean
}

class Layout extends React.Component<LayoutStoreProps, LayoutState>{
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
        return (
            <>
                <Toolbar
                    menuOpened={this.sideDrawOpenHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer
                    closed={this.sideDrawerClosedHandler}
                    isOpen={this.state.isSideDrawerOpen}
                    isAuthenticated={this.props.isAuthenticated}/>
                <Main>
                    {this.props.children}
                </Main>
            </>
        )
    }
}

const mapStateToProps = (state: RootState):LayoutStoreProps  => ({isAuthenticated: !!state.auth.token});

export default connect<LayoutStoreProps, {}, {}, RootState>(mapStateToProps)(Layout);