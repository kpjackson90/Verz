

import React, { Component } from "react";
import { AUTH_TOKEN } from "../../constants";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "", login: true };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
  }

  render() {
    return ( 
      <div className="login-bg">
        <div className="login-box">
          <h3>Welcome Back!</h3>
          <p>Sign in here</p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="input-field">
              <input
                className="form-control login-input"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="input-field">
              <input
                placeholder="Enter Password"
                type="password"
                className="form-control login-input"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <a href='#'>Forgot your password?</a>
            </div>
            <div className="submit-section">
              <button className="btn btn-login">
                Sign In
              </button>
            <a href="" >Not a member? Sign up here!</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;
