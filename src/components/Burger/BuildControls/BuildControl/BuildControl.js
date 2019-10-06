import React from 'react';
import styled from "styled-components";

const StyledBuildControl = styled.div`
    display: flex;
    justify-content: space-between;
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
    :disabled {
        background-color: #AC9980;
        color: #ccc;
        cursor: not-allowed;
    }
`;

const BuildControlButtonMore = styled(BuildControlButton)`
    background-color: #8F5E1E;
    color: white;
    :hover {
        background-color: #DAA972;
        color: white;
    };
    :disabled {
        background-color: #AC9980;
        color: #ccc;
        cursor: not-allowed;
    }
    :not(:disabled) {
        animation: enable 0.3s linear;
    }

    @keyframes enable {
    0% {
        transform: scale(1);
    }
    60% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
`;

export default function buildControl ({label, added, removed, disabled}) {
    return (
        <StyledBuildControl>
            <BuildControlLabel>{label}</BuildControlLabel>
            <BuildControlButtonLess onClick={removed} disabled={disabled}>Less</BuildControlButtonLess>
            <BuildControlButtonMore onClick={added}>More</BuildControlButtonMore>
        </StyledBuildControl>);
}