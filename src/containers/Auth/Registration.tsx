import React from 'react';
import styled from 'styled-components';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button, { ACCEPT_TYPE } from '../../components/UI/Button/Button';
import rootStoreContext from '../../context/rootStoreContext';
import { CustomInput } from '../../components/UI/Input/CustomInput';

const StyledAuth = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  @media ( min-width: 600px ) {
    width: 700px;
  }
`;

@observer
class Registration extends React.Component {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  @observable username: string = '';
  @observable email: string = '';
  @observable age: string = '';
  @observable password1: string = '';
  @observable password2: string = '';

  @action authHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    let age: number|undefined = undefined;
    event.preventDefault();

    if (this.age) {
      age = parseInt(this.age, 10);
    }

    this.context.authStore.register(this.username, this.password1, this.email, age);
  }

  @action
  handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.username = event.target.value;
  }

  @action
  handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.email = event.target.value;
  }

  @action
  handleAgeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.age = event.target.value;
  }

  @action
  handlePassword1Input = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.password1 = event.target.value;
  }

  @action
  handlePassword2Input = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.password2 = event.target.value;
  }

  @computed
  get isSubmitDisabled () {
    return !(this.username && this.password1 && this.password2 && this.email);
  }

  render () {
    if ( this.context.authStore.isLoading ){
      return <Spinner />
    }

    if ( this.context.authStore.isAuthenticated ){
      return <Redirect to='/'/>
    }

    return (
      <StyledAuth>
        <form>
          {this.context.authStore.error}
          <h2>Registration</h2>
          <CustomInput value={this.username} name='username' onChange={this.handleUsernameInput} placeholder='Username'/>
          <CustomInput value={this.email} name='email' onChange={this.handleEmailInput} placeholder='Email'/>
          <CustomInput value={this.age} name='age' onChange={this.handleAgeInput} placeholder='Age'/>
          <CustomInput value={this.password1} name='password1' type='password' onChange={this.handlePassword1Input} placeholder='Password'/>
          <CustomInput value={this.password2} name='password2' type='password' onChange={this.handlePassword2Input} placeholder='Repeat password'/>
          <Button type={ACCEPT_TYPE} clicked={this.authHandler} disabled={this.isSubmitDisabled}>SUBMIT</Button>
        </form>
      </StyledAuth>
    );
  }
}

export default Registration;
