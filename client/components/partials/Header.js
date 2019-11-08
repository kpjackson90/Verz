import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { AUTH_TOKEN } from "../../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
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
          <div>
            {authToken ? (
              <div
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  history.push("/");
                }}
              >
                Logout
              </div>
            ) : (
              <div>
                <Link className="btn btn-sm btn-outline-secondary" to="/login">
                  Login
                </Link>

                <Link className="btn btn-sm btn-outline-secondary" to="/signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </form>
      </nav>
    );
  }
}

export default Header;
