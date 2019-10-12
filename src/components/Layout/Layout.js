import React from 'react';
import styled from 'styled-components';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

const Main = styled.main`
    margin-top: 72px;
`;

export default class Layout extends React.Component{
    state = {
        isSideDrawerOpen: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({isSideDrawerOpen: false})
    }

    render(){
        return (
            <>
                <Toolbar />
                <SideDrawer closed={this.sideDrawerClosedHandler} isOpen={this.state.isSideDrawerOpen}/>
                <Main>
                    {this.props.children}
                </Main>
            </>
        )
    }
}