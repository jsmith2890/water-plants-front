import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const NavBar = ({ logOut }) => (
  <ul className='nav'>
    <li>
      <Link to={'/calendar'}>Calendar</Link>
      <button onClick={logOut}>Log Out</button>
    </li>
  </ul>
);

export default NavBar;
