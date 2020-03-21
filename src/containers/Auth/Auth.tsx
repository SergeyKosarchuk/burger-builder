import React from 'react';
import styled from 'styled-components';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Input } from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spiner';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';
import rootStoreContext from '../../context/rootStoreContext';

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

@observer
class Auth extends React.Component {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  @observable email: string = '';
  @observable password: string = '';
  @observable isSignup: boolean = true;

  @action authHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.isSignup) {
      this.context.authStore.register(this.email, this.password);
    }
    else {
      this.context.authStore.login(this.email, this.password);
    }
  }

  @action
  handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    this.email = event.target.value;
  }

  @action
  handlePassowrdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    this.password = event.target.value;
  }

  @action
  switchAuthModeHandler = () => {
    this.isSignup = !this.isSignup;
  }

  @computed
  get isSubmitDisabled () {
    return !(this.email && this.password);
  }

  @computed
  get formLabel () {
    return this.isSignup ? 'SIGN IN' : 'SIGN UP';
  }

  render () {
    if ( this.context.authStore.isLoading ){
      return <Spinner />
    }

    if ( this.context.authStore.isAuthenticated ){
      debugger
      return <Redirect to='/'/>
    }

    return (
      <StyledAuth>
        <form>
          {this.context.authStore.error}
          <Input value={this.email} fieldName='email' onChange={this.handleEmailInput} placeholder='Email'/>
          <Input value={this.password} fieldName='password' onChange={this.handlePassowrdInput} placeholder='Password'/>
          <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={this.isSubmitDisabled}>SUBMIT</Button>
        </form>
      <Button clicked={this.switchAuthModeHandler}>SWITCH TO {this.formLabel}</Button>
      </StyledAuth>
    );
  }
}

export default Auth;