/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Verz.svg';
import search from '../../assets/ei_search.svg';
import nav from './Nav';

const MainHeader = ({ setAuthFlow }) => {
  return (
    <nav className='navbar bg-white border-bottom'>
      <Link className='navbar-brand' to='/' onClick={() => setAuthFlow(false)}>
        <img className='logo' src={logo} alt='logo' />
      </Link>
      <form className='form-inline'>
        <Link to='/discover' className='nav-link nav-text'>
          <img className='nav-icon' src={search} alt='search' />
        </Link>

        <Link to='/discover' className='nav-link nav-text'>
          Discover
        </Link>

        <Link className='nav-text nav-link' to='/login' onClick={() => setAuthFlow(false)}>
          Login
        </Link>

        <Link className='btn nav-btn' to='/signup' onClick={() => setAuthFlow(true)}>
          Sign Up
        </Link>
      </form>
    </nav>
  );
};

export default MainHeader;
