import React from 'react';
import styled from "styled-components";
import Backdrop from '../Backdrop/Backdrop';

const Modal = styled.div`
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

const modal = ({ show, clicked, children, ...rest }) => (
    <>
        <Modal show={show}>{children}</Modal>
        <Backdrop show={show} clicked={clicked}></Backdrop>
    </>
)

export default modal