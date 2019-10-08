import React from 'react';
import styled from 'styled-components';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

const Main = styled.main`
    margin-top: 72px;
`;

export default function Layout( props ){
    return (
        <>
            <Toolbar />
            <SideDrawer />
            <Main>
                {props.children}
            </Main>
        </>
    )
}