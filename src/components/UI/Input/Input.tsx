import React from 'react';
import styled from 'styled-components';

import {
    ISelectProps,
    IStyledInputProps,
    IInputProps,
    IMakeInput,
    IMakeInputParams
} from './types';

const InputWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const StyledInput = styled.input<IStyledInputProps>`
    outline: none;
    border: 1px solid;
    border-color: ${props => props.hasError ? '#fc4903': 'grey'};
    background-color: ${props => props.hasError ? '#fc4903': 'white'};
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

const StyledSelect = styled.select<IStyledInputProps>`
    outline: none;
    border: 1px solid;
    border-color: ${props => props.hasError ? '#fc4903': 'grey'};
    background-color: ${props => props.hasError ? '#fc4903': 'white'};
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

const Option = styled.option``;

const Input = (props: IInputProps) => {
    return (
        <InputWrapper>
            <StyledInput {...props} name={props.fieldName}/>
        </InputWrapper>
    );
}

const Select = (props: ISelectProps) => {
    const options = props.options.map(option => <Option key={option.value} {...option}/>)

    return (
        <InputWrapper>
            <StyledSelect {...props}>{options}</StyledSelect>
        </InputWrapper>
    );
}


const makeInput: IMakeInput = ({fieldName, fieldType, fieldOptions, changed, hasError, value}: IMakeInputParams) => {
    switch (fieldType) {
        case 'input':
            return <Input key={fieldName} {...fieldOptions} onChange={changed} fieldName={fieldName} hasError={hasError} value={value}/>
        case 'select':
            return <Select key={fieldName} {...fieldOptions} onChange={changed} fieldName={fieldName} hasError={hasError} value={value}/>
        default:
            return <Input key={fieldName} {...fieldOptions} onChange={changed} fieldName={fieldName} hasError={hasError} value={value}/>;
    }
}

export default makeInput;
export { Input, Select };