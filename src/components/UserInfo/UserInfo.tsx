import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import rootStoreContext from '../../context/rootStoreContext';

const StyledUserInfo = styled.p`
  text-transform: capitalize;
  color: white;
  font-size: large;
  text-align: center;
`;

const Wrapper = styled.div`
  left: 48%;
  position: absolute;
`;

@observer
export default class UserInfo extends React.Component {
  static contextType = rootStoreContext;
  context!: React.ContextType<typeof rootStoreContext>;

  render() {
    const user = this.context.authStore.user;

    return (
      <Wrapper>
        <StyledUserInfo>Hi, {user.username}!</StyledUserInfo>
      </Wrapper>
    );
  }
}
