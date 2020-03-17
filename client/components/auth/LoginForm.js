import React, {useState} from "react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="login-bg">
    <div className="login-box">
      <h3>Welcome Back!</h3>
      <p>Sign in here</p>
      <form>
        <div className="input-field">
          <input
            className="form-control login-input"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail({ email: e.target.value })}
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Enter Password"
            type="password"
            className="form-control login-input"
            value={password}
            onChange={e => setPassword({ password: e.target.value })}
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
  )
}


export default LoginForm;