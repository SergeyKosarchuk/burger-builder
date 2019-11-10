import React from 'react';
import styled from 'styled-components';


const Input = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

const StyledInput = styled.input`
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;

    :focus {
        outline: none;
        background-color: #ccc;
    }
`;

const input = (props) => {
    return (
        <Input>
            <Label>{props.fieldName}</Label>
            <StyledInput {...props} />
        </Input>
    );
}

export default input;