import React from "react";
import LoginForm from "./LoginForm";
import LoginUser from "../../mutations/Login";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

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

  return <LoginForm login={login} />;
};

export default Login;