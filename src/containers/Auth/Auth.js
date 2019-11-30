import React from 'react';
import styled from 'styled-components';

import { Input } from '../../components/UI/Input/Input';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';

const StyledAuth = styled.div`
`;


export default class Auth extends React.Component {
    state = {
        email: '',
        password: '',
        disabled: true,
    }

    authHandler = () => {
        console.log(this.state);
    }

    handleInput = (event) => {
        event.persist()
        const name = event.target.name;
        const value = event.target.value;

        this.setState((state) => {
            const newState = {...state};
            newState[name] = value;

            if (newState.email && newState.password){
                newState.disabled = false;
            }
            return newState
        })
    }

    render () {
        const { email, password, disabled} = this.state;

        return (
            <StyledAuth>
                <form>
                    <Input value={email} fieldName='email' onChange={this.handleInput}/>
                    <Input value={password} fieldName='password' onChange={this.handleInput}/>
                    <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={disabled}>SAVE</Button>
                </form>
            </StyledAuth>
        );
    }
}