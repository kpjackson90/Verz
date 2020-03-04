import React from "react";
import AuthForm from "./AuthForm";
import LoginUser from "../../mutations/Login";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { graphql } from "react-apollo";
import query from "../../queries/CurrentUser";
import history from "../../history";


const Login = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LoginUser, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeDate({ data: { isLoggedIn: true } });
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occured</p>;

  return <AuthForm login={login} />;
};

export default Login;