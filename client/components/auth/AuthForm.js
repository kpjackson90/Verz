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
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="input-field  pt-top-10">
              <input
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="input-field  pt-top-10">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="pt-top-10">
              <button className="btn btn-primary btn-sm btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;
