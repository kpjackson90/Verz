/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Verz.svg';

const AuthHeader = ({ setAuthFlow }) => {
  return (
    <>
      <nav className='navbar bg-white border-bottom'>
        <Link className='navbar-brand' to='/' onClick={() => setAuthFlow(false)}>
          <img className='logo' src={logo} alt='img' />
        </Link>

        <Link className='nav-text nav-link' to='/login' onClick={() => setAuthFlow(true)}>
          Login
        </Link>
      </nav>
    </>
  );
};

export default AuthHeader;
