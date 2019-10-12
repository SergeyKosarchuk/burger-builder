import React from 'react';
import styled from 'styled-components';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

const Main = styled.main`
    margin-top: 72px;
`;

export default class Layout extends React.Component{
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
                <Toolbar menuOpened={this.sideDrawOpenHandler}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} isOpen={this.state.isSideDrawerOpen}/>
                <Main>
                    {this.props.children}
                </Main>
            </>
        )
    }
}