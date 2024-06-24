import React from 'react'
import styled from 'styled-components';
import 'normalize.css'
import {Link} from 'react-router-dom';

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #2c32d4;
    color: white;
`;

const NavLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavLink  = styled(Link)`

  color : white;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
  text-decoration: underline;
  }
`
const NavItem = styled.li`
  margin: 0 1rem;
`
function Navbar() {

  return (
    <NavbarContainer>
      <NavLogo to="/">REAL DATA UMC PLAYLIST</NavLogo>
      <NavItems>
        <NavItem>
          <NavLink to="/">Cart</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/">Play List</NavLink>
        </NavItem>
      </NavItems>
    </NavbarContainer>
  )
}

export default Navbar