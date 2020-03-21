import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;

type navigationItemsProps = {
  isAuthenticated: boolean,
}

export default function navigationItems (props: navigationItemsProps) {
  const { isAuthenticated } = props;
  const links = [<NavigationItem key='/' link='/'>Burger Builder</NavigationItem>];

  if (isAuthenticated){
    links.push(<NavigationItem key='/orders' link='/orders'>Orders</NavigationItem>);
    links.push(<NavigationItem key='/logout' link='/logout'>Logout</NavigationItem>);
  }
  else {
    links.push(<NavigationItem key='/registration' link='/registration'>Registration</NavigationItem>);
  }

  return <NavigationItems>{links}</NavigationItems>;
};