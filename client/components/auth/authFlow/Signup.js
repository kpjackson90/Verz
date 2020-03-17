import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { graphql } from 'react-apollo';
import mutation from '../../../mutations/Signup';
import query from '../../../queries/CurrentUser';
import history from '../../../history';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  /*
  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      history.push("/");
    }
  }
  */

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });

    history.push('/');
  }

  render() {
    return (
      <div>
        <SignupForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(Signup));
