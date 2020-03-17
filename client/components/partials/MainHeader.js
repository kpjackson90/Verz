import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Verz.svg";
import search from "../../assets/ei_search.svg";
import nav from './Nav';

const MainHeader = () => {
    return(
      <nav className="navbar bg-white border-bottom">
      <Link className="navbar-brand" to="/" >
        <img className="logo" src={logo} />
      </Link>
   
      <form className="form-inline">
        <Link to="/discover" className="nav-link nav-text">
          <img className="nav-icon" src={search}/>
        </Link>
   
        <Link to="/discover" className="nav-link nav-text">
          Discover
        </Link>
   
        <Link className="nav-text nav-link" to="/login">
          Login
        </Link>
   
        <Link className="btn nav-btn" to="/signup">
          Sign Up
        </Link>
      </form>
    </nav>
    )


   //create a boolean called authFlow and set it to false
   //keep in header
   //when user clicks sign up, set authFlow to true
   //Once you are in auth flow then hide the nav items that you don't need 

}

export default MainHeader;