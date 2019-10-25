import React from "react";

function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-5 pt-top-100">
          <h4>Welcome Back</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 pt-top-10">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 pt-top-10">
          <input
            type="password"
            class="form-control"
            id="password"
            aria-describedby="pass"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 pt-top-10">
          <button type="button" class="btn btn-primary btn-sm btn-block">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
