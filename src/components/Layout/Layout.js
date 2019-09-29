import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
    margin-top: 16px;
`;

export default function Layout( props ){
    return (
        <>
            <div>Toolbar, Sidebar, Backdrop</div>
            <Main>
                {props.children}
            </Main>
        </>
    )
}