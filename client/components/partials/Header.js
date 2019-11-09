import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../history";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Verz
          <span className="navbar-text">
            <h6>Lyrical Intent</h6>
          </span>
        </a>

        <form className="form-inline">
          <Link to="/discover" className="nav-link">
            Discover
          </Link>

          <Link className="btn btn-sm btn-outline-secondary" to="/login">
            Login
          </Link>

          <Link className="btn btn-sm btn-outline-secondary" to="/signup">
            Signup
          </Link>
        </form>
      </nav>
    );
  }
}

export default Header;
