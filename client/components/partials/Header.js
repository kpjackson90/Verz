import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="/">
          Verz
          <span class="navbar-text">
            <h6>Lyrical Intent</h6>
          </span>
        </a>

        <form class="form-inline">
          <Link to="/discover" class="nav-link">
            Discover
          </Link>

          <Link class="btn btn-sm btn-outline-secondary" to="/login">
            Login
          </Link>

          <Link class="btn btn-sm btn-outline-secondary" to="/signup">
            Signup
          </Link>
        </form>
      </nav>
    );
  }
}

export default Header;
