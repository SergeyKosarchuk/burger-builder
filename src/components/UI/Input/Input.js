import React from 'react';
import styled, { css } from 'styled-components';


const InputWrapper = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

const styledInput = css`
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
            <Label>{props.fieldName}</Label>
            <StyledInput {...props} />
        </InputWrapper>
    );
}

const Select = (props) => {
    const options = props.options.map(option => <Option key={option.value} {...option}/>)

    return (
        <InputWrapper>
            <Label>{props.fieldName}</Label>
            <StyledSelect {...props}>{options}</StyledSelect>
        </InputWrapper>
    );
}

function makeInput (fieldName, fieldType , fieldOptions) {
    switch (fieldType) {
        case 'input':
            return <Input key={fieldName} {...fieldOptions}/>
        case 'select':
            return <Select key={fieldName} {...fieldOptions}/>
        default:
            return <Input key={fieldName} {...fieldOptions}/>;
    }
}

export default makeInput;
export { Input, Select };