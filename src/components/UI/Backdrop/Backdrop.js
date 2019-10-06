import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

export default function backdrop (props) {
    return props.show ? <Backdrop onClick={props.clicked}></Backdrop> : null;
}