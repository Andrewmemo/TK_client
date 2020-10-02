import React from "react";

export const HomeNav: React.FunctionComponent = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand home-nav-brand" href="#">
        Tech-Stack Kachalochka
      </a>
      <ul className="navbar-nav">
        <button type="button" className="btn btn-warning home-nav-button">
          Sign Up
        </button>
        <button type="button" className="btn btn-primary home-nav-button">
          Log In
        </button>
      </ul>
    </nav>
  );
};
