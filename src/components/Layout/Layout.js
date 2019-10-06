import React from 'react';
import styled from 'styled-components';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';

const Main = styled.main`
    margin-top: 72px;
`;

export default function Layout( props ){
    return (
        <>
            <Toolbar />
            <Main>
                {props.children}
            </Main>
        </>
    )
}