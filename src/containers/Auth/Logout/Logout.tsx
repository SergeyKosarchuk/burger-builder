import React from 'react';
import { Redirect } from 'react-router-dom';

interface ILogoutProps {
  onLogout(): void
}

class Logout extends React.Component<ILogoutProps>{
  componentDidMount () {
    this.props.onLogout();
  }

  render (){
    return <Redirect to='/'/>
  }
}

export default Logout;
