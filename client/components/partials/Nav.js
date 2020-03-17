import React from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import logo from "../../assets/Verz.svg";
import search from "../../assets/ei_search.svg";



const Nav = () => {
    return (
        <nav className="navbar bg-white border-bottom">
          <Link className="navbar-brand" to="/">
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
      );
}


export default Nav;
