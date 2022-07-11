import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IS_LOGED } from "../../services";

const Navbar = () => {
  // GET_TOKEN
  const myToken = JSON.parse(localStorage.getItem("token"));
  let [isLoged, setIsLoged] = useState();
  console.log(isLoged);

  useEffect(() => {
    getToken(myToken);
  }, []);

  const getToken = async (mytoken) => {
    try {
      const res = await IS_LOGED(mytoken);
      setIsLoged(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              {/* <button className="btn btn-primary mx-2 px-4" type="button">
                Login
              </button> */}
              {isLoged?.data ? (
                <button className="btn btn-primary mx-2 px-4">My Profile</button>
              ) : (
                <Link to="/login" className="btn btn-primary mx-2 px-4">
                  Login/Register
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
