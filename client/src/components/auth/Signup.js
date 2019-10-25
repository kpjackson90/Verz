import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Signup() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-4 pt-top-100">
          <h4>Join The Largest Network of Creatives</h4>
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
            Signup
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 pt-top-10">
          <p>
            Already have an account?
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
