import React from "react";
import { Link } from "react-router-dom";

export const HomeNav: React.FunctionComponent = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand home-nav-brand" href="#">
        Tech-Stack Kachalochka
      </a>
      <ul className="navbar-nav">
        <Link to={"/reg"}>
          <button type="button" className="btn btn-warning home-nav-button">
            Sign Up
          </button>
        </Link>
        <Link to={"/login"}>
          <button type="button" className="btn btn-primary home-nav-button">
            Log In
          </button>
        </Link>
      </ul>
    </nav>
  );
};
