import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
`;

const StyledInput = styled.input<StyledCustomInputProps>`
  border: 1px solid;
  border-color: ${props => props.hasError ? '#fc4903': 'grey'};
  background-color: ${props => props.hasError ? '#fc4903': 'white'};
  font: inherit;
  padding: 6px 10px;
  width: 80%;
  box-sizing: border-box;
  text-align: left;
  margin-left: 5px;

  :focus {
    outline: none;
    background-color: #ccc;
  }
`;

const StyledLabel = styled.label`
  text-transform: capitalize;
  /* margin-left: auto; */
`;

interface StyledCustomInputProps {
  hasError?: boolean;
}

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  return (
    <InputWrapper>
      <StyledLabel>{props.name}:<StyledInput {...props} /></StyledLabel>
    </InputWrapper>
  )
}

export { CustomInput }
