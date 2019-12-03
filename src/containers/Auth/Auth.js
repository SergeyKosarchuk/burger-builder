import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input } from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spiner';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';

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
        isSignUp: true,
    }

    authHandler = (event) => {
        const { email, password, isSignUp } = this.state

        event.preventDefault();
        this.props.authenticate(email, password, isSignUp);
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

    switchAuthModeHandler = (prevState) => {
        this.setState(prevState => ({isSignUp: !prevState.isSignUp}));
    }

    render () {
        const { email, password, disabled, isSignUp} = this.state;
        const switchMessage = isSignUp ? 'SIGN IN' : 'SIGN UP';

        if ( this.props.isLoading ){
            return <Spinner />
        }

        return (
            <StyledAuth>
                <form>
                    <Input value={email} fieldName='email' onChange={this.handleInput} placeholder='Email'/>
                    <Input value={password} fieldName='password' onChange={this.handleInput} placeholder='Password'/>
                    <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={disabled}>SUBMIT</Button>
                </form>
            <Button clicked={this.switchAuthModeHandler}>SWITCH TO {switchMessage}</Button>
            </StyledAuth>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignUp) => dispatch(actions.authanticate(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);