import React from 'react';
import styled from "styled-components";
import Backdrop from '../Backdrop/Backdrop';

export type StyledModalProps = {
    show: boolean
}

const StyledModal = styled.div<StyledModalProps>`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: ${props => props.show ? 'translateY(0)' : 'translateY(-100vh)'};
    opacity: ${props => props.show ? '1' : '0'};

    @media (min-width: 600px) {
        width: 500px;
        left: calc(50% - 250px);
    }
`;

export type ModalProps = {
    show: boolean,
    clicked(): void,
    children: any 
}



function modal (props: ModalProps): JSX.Element {
    const { show, clicked, children } = props

    return (
        <>
            <StyledModal show={show}>{children}</StyledModal>
            <Backdrop show={show} clicked={clicked}></Backdrop>
        </>
    );
}

const memorizedModal = React.memo(modal);
export default memorizedModal;
