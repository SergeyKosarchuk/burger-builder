import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Input } from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spiner';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';
import { authenticate } from '../../store/Auth/actions';
import { RootState } from '../../store/store';

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

interface IAuthState {
    email: string,
    password: string,
    disabled: boolean,
    isSignUp: boolean
}

interface IAuthProps {
    authenticate(email: string, password: string, isSignUp: boolean): void,
    isLoading: boolean,
    isAuthenticated: boolean,
    error?: string
}

class Auth extends React.Component<IAuthProps, IAuthState> {
    state = {
        email: '',
        password: '',
        disabled: true,
        isSignUp: true,
    }

    authHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { email, password, isSignUp } = this.state

        event.preventDefault();
        this.props.authenticate(email, password, isSignUp);
    }

    handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const value = event.target.value;

        this.setState(state => {
            const newState = {...state, email: value};

            if (newState.email && newState.password){
                newState.disabled = false;
            }

            return newState;
        })
    }

    handlePassowrdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const value = event.target.value;

        this.setState(state => {
            const newState = {...state, password: value};

            if (newState.email && newState.password){
                newState.disabled = false;
            }

            return newState;
        })
    }

    switchAuthModeHandler = () => {
        this.setState((prevState: IAuthState) => ({isSignUp: !prevState.isSignUp}));
    }

    render () {
        const { email, password, disabled, isSignUp} = this.state;
        const switchMessage = isSignUp ? 'SIGN IN' : 'SIGN UP';
        let errorMessage = null;

        if ( this.props.isLoading ){
            return <Spinner />
        }

        if ( this.props.isAuthenticated ){
            return <Redirect to='/'/>
        }

        if ( this.props.error) {
            errorMessage = <p>{this.props.error}</p>;
        }

        return (
            <StyledAuth>
                <form>
                    {errorMessage}
                    <Input value={email} fieldName='email' onChange={this.handleEmailInput} placeholder='Email'/>
                    <Input value={password} fieldName='password' onChange={this.handlePassowrdInput} placeholder='Password'/>
                    <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={disabled}>SUBMIT</Button>
                </form>
            <Button clicked={this.switchAuthModeHandler}>SWITCH TO {switchMessage}</Button>
            </StyledAuth>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        authenticate: (email: string, password: string, isSignUp: boolean) => dispatch(authenticate(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);