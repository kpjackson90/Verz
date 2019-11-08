import gql from "graphql-tag";

export default gql`
  mutation createUser($email: String, $password: String) {
    createUser(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;
