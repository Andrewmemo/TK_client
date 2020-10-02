import React from "react";

import "./Login.css";

export const Login: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="login-form">
        <form>
          <h1 className="login-header">Login form</h1>
          <div className="form-group">
            <label className="login-label" htmlFor="formGroupEmail">
              Your e-mail
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupEmail"
              placeholder="something@gmail.com"
            />
          </div>
          <div className="form-group">
            <label className="login-label" htmlFor="formGroupPassword">
              Your password
            </label>
            <input
              type="password"
              className="form-control"
              id="formGroupPassword"
            />
          </div>

          <button type="button" className="login-button btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
