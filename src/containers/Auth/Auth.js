import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input } from '../../components/UI/Input/Input';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import { tsImportEqualsDeclaration } from '@babel/types';

const StyledAuth = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;

    @media ( min-width: 600px ) {
        width: 500px;
    }
`;


class Auth extends React.Component {
    state = {
        email: '',
        password: '',
        disabled: true,
    }

    authHandler = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.email, this.state.password);
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
                    <Input value={email} fieldName='email' onChange={this.handleInput} placeholder='Email'/>
                    <Input value={password} fieldName='password' onChange={this.handleInput} placeholder='Password'/>
                    <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={disabled}>SUBMIT</Button>
                </form>
            </StyledAuth>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(actions.authanticate(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);