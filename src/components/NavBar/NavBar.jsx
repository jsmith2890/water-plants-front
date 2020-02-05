import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

const NavBar = ({ logOut }) => (
  <ul className='nav'>
    <li>
      <Link to={'/calendar'}>
        <button>Calendar</button>
      </Link>
    </li>
    <li>
      <Link to={'/plant/new'}>
        <button>Add Plant</button>
      </Link>
    </li>
    <li>
      <button onClick={logOut}>Log Out</button>
    </li>
  </ul>
);

export default NavBar;
