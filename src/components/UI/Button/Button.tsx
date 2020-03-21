import React from 'react';
import styled from 'styled-components';

const ACCEPT_TYPE = 'accept'

type styledButtonProps = {
  pointer: string,
  color: string
}

const Button = styled.button<styledButtonProps>`
  background-color: transparent;
  border: none;
  color: ${props => props.color};
  outline: none;
  cursor: ${props => props.pointer};
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
`;

type buttonProps = {
  clicked(event: React.MouseEvent<HTMLButtonElement>): void,
  type?: string,
  children: any,
  disabled?: boolean
}

export default function button (props: buttonProps) {
  const { clicked, type, children, disabled } = props;
  let color = type === ACCEPT_TYPE ? 'green' : 'red';
  let pointer = 'pointer';

  if (disabled){
    color = 'grey'
    pointer = 'not-allowerd'
  }

  return <Button onClick={clicked} color={color} pointer={pointer}>{children}</Button>
}

export { ACCEPT_TYPE };