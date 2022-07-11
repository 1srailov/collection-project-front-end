import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
  err: "",
};
const Login = () => {
  const [user, setUser] = useState(initialState);
  const [data, setData] = useState([]);
  // const status = data?.status;
  // const role = data?.data?.roles[0];
  // const token = data?.data?.token;
  const { username, password } = user;

  const handleChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/sign-in", {
        username,
        password,
      });

      // setUser({ ...user, err: "" });
      setData(res);
      console.log(res);

      localStorage.setItem(
        "token",
        JSON.stringify(`Bearer ${res?.data?.token}`)
      );

      if (res?.data?.roles[0] == "ROLE_USER") {
        navigate("/home");
      }
    } catch (err) {
      toast.error("Wrong username or password");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="offset-4 col-4 mt-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example1"
                className="form-control"
                onChange={handleChangeInput}
                value={username}
                name="username"
              />
              <label className="form-label" htmlFor="form2Example1">
                Username
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example2"
                className="form-control"
                onChange={handleChangeInput}
                value={password}
                name="password"
              />
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block w-100 mb-4"
              onClick={handleSubmit}
              // to={
              //   data?.status == 200 && data?.data?.roles[0] == "ROLE_USER"
              //     ? "/home"
              //     : "/admin"
              // }
            >
              Login
            </button>

            <div className="text-center">
              <p>
                Not a member?
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
