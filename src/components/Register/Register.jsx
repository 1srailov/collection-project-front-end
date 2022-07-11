import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="offset-4 col-4 mt-5">
          <form>
            <h1 className="text-center">Register</h1>
            <div className="form-outline mb-4">
              <input type="text" id="form2Example1" className="form-control" />
              <label className="form-label" htmlFor="form2Example1">
                Username
              </label>
            </div>
            <div className="form-outline mb-4">
              <input type="email" id="email" className="form-control" />
              <label className="form-label" htmlFor="email">
                Email
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
              />
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block w-100 mb-4"
            >
              Register
            </button>

            <div className="text-center">
              <p>
                You have account?
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
