import React, { Component } from "react";
import AuthForm from "./AuthForm";
import LoginMutation from "../../mutations/Login";
import { graphql } from "react-apollo";
import query from "../../queries/CurrentUser";
import history from "../../history";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        onCompleted: { data: this._confirm(data) },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
    history.push("/");
  }

  render() {
    return (
      <div>
        <div className="col-md-6 offset-md-4 pt-top-100">
          <h4>Login</h4>
        </div>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }

  /*
  _confirm = async data => {
    const { token } = data.login;
    this._saveUserData(token);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}
*/
}

export default graphql(query)(graphql(LoginMutation)(Login));
