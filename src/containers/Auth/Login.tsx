import React from 'react';
import styled from 'styled-components';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { CustomInput } from '../../components/UI/Input/CustomInput';
import Spinner from '../../components/UI/Spinner/Spinner';
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
    width: 700px;
  }
`;

@observer
class Login extends React.Component {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  @observable username: string = '';
  @observable password: string = '';

  @action loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.context.authStore.login(this.username, this.password);
  }

  @action
  handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.username = event.target.value;
  }

  @action
  handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.password = event.target.value;
  }

  @computed
  get isSubmitDisabled () {
    return !(this.username && this.password);
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
          <h2>Login</h2>
          <CustomInput value={this.username} name='username' onChange={this.handleEmailInput} placeholder='Username' minLength={5} maxLength={10}/>
          <CustomInput value={this.password} name='password' type='password' onChange={this.handlePasswordInput} placeholder='Password'/>
          <Button type={ACCEPT_TYPE} clicked={this.loginHandler} disabled={this.isSubmitDisabled}>SUBMIT</Button>
        </form>
      </StyledAuth>
    );
  }
}

export default Login;
