import React from 'react';
import styled, { css } from 'styled-components';


const InputWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const styledInput = css`
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

const StyledInput = styled.input`
    ${styledInput}
`;

const StyledSelect = styled.select`
    ${styledInput}
`;

const Option = styled.option``;

const Input = (props) => {
    return (
        <InputWrapper>
            <StyledInput {...props} name={props.fieldName}/>
        </InputWrapper>
    );
}

const Select = (props) => {
    const options = props.options.map(option => <Option key={option.value} {...option}/>)

    return (
        <InputWrapper>
            <StyledSelect {...props}>{options}</StyledSelect>
        </InputWrapper>
    );
}

function makeInput (fieldName, fieldType , fieldOptions, changed, hasError, value) {
    switch (fieldType) {
        case 'input':
            return <Input key={fieldName} {...fieldOptions} onChange={changed} name={fieldName} hasError={hasError} value={value}/>
        case 'select':
            return <Select key={fieldName} {...fieldOptions} onChange={changed} name={fieldName} hasError={hasError} value={value}/>
        default:
            return <Input key={fieldName} {...fieldOptions} onChange={changed} name={fieldName} hasError={hasError} value={value}/>;
    }
}

export default makeInput;
export { Input, Select };