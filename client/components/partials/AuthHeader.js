import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Verz.svg";
import search from "../../assets/ei_search.svg";
import nav from './Nav';

const AuthHeader = () => {

    return( 
      <nav className="navbar bg-white">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} />
        </Link> 
        <form className="form-inline">
          <Link className="nav-text2 nav-link" to="/login">
            Login
          </Link>
        </form>
      </nav>
    )

   //create a boolean called authFlow and set it to false
   //keep in header
   //when user clicks sign up, set authFlow to true
   //Once you are in auth flow then hide the nav items that you don't need 

}

export default AuthHeader;