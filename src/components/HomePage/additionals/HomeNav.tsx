import React from "react";

import { Link } from "react-router-dom";
import { User } from "../../../interfaces/user.interface";

export const HomeNav: React.FunctionComponent<{
  currentUser: User;
  setCurrentUser: Function;
}> = ({ currentUser }) => {
  const onClickDropDown = () => {
    const dropDownElement = document.getElementsByClassName(
      "dropdown-menu"
    )[0] as HTMLDivElement;

    dropDownElement.classList.toggle("show");
  };

  const onClickLogOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3">
            <h1 className="site-logo">
              <a href="/" className="h2">
                Tech-Stack<span className="text-warning">.</span>
              </a>
            </h1>
          </div>
          <div className="col-9">
            <nav
              className="site-navigation position-relative text-right text-md-right"
              role="navigation"
            >
              <div className="d-block d-lg-none ml-md-0 mr-auto">
                <a
                  href="/#"
                  className="site-menu-toggle js-menu-toggle text-black"
                >
                  <span className="icon-menu h3"></span>
                </a>
              </div>

              <ul className="site-menu js-clone-nav d-none d-lg-block">
                {!currentUser.email && (
                  <React.Fragment>
                    <Link to={"/reg"}>
                      <button
                        type="button"
                        className="btn btn-danger home-nav-button"
                      >
                        Sign Up
                      </button>
                    </Link>
                    <Link to={"/login"}>
                      <button
                        type="button"
                        className="btn btn-success home-nav-button"
                      >
                        Log In
                      </button>
                    </Link>
                  </React.Fragment>
                )}
                {currentUser.email && (
                  <React.Fragment>
                    <div className="homeCurrentUser">
                      <img
                        alt="Avatar"
                        src={currentUser.photo}
                        className="homeCurrentUserPhoto ml-2"
                      />
                      <div className="dropdown">
                        <button
                          onClick={onClickDropDown}
                          className="btn"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {currentUser.first_name} {currentUser.last_name}
                        </button>
                        <div
                          className="dropdown-menu"
                          style={{
                            position: "absolute",
                            transform: "translate3d(0px, 38px, 0px)",
                            left: "536px",
                            top: "2px",
                            float: "none",
                            willChange: "transform",
                          }}
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="/me">
                            Profile
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={onClickLogOut}
                            href="/"
                          >
                            Log out
                          </a>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
