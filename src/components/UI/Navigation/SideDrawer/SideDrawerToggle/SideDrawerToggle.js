import React from 'react';
import styled from 'styled-components';

const SideDrawerToggle = styled.div`
    color: white;
`;

export default function sideDrawerToogle ({ clicked, children }) {
    return <SideDrawerToggle onClick={clicked}>{children}</SideDrawerToggle>
}
