import React from 'react';
import styled from "styled-components";

const StyledBuildControl = styled.div`
    display: flex;
    justify-content; space-between;
    align-items: center;
    margin: 5px 0;
`;

const BuildControlButton = styled.button`
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    width: 80px;
    border: 1px solid #AA6817;
    cursor: pointer;
    outline: none;
`;

const BuildControlLabel = styled.label`
    padding: 10px;
    font-weight: bold;
    width: 80px;
`;

const BuildControlButtonLess = styled(BuildControlButton)`
    background-color: #D39952;
    color: white;
    :hover {
        background-color: #DAA972;
        color: white;
    }
`;

const BuildControlButtonMore = styled(BuildControlButton)`
    background-color: #8F5E1E;
    color: white;
    :hover {
        background-color: #DAA972;
        color: white;
    }
`;

export default function buildControl ({label, added, removed}) {
    return (
        <StyledBuildControl>
            <BuildControlLabel>{label}</BuildControlLabel>
            <BuildControlButtonLess onClick={removed}>Less</BuildControlButtonLess>
            <BuildControlButtonMore onClick={added}>More</BuildControlButtonMore>
        </StyledBuildControl>);
}