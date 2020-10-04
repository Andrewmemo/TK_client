import React, { useState } from "react";
import axios from "axios";

import "./Login.css";

export const Login = () => {
  const [loginErrors, setLoginErrors] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onClickHandler = async () => {
    setLoginErrors("");
    let user = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      await axios.post("http://localhost:5000/login", user);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setLoginErrors(ex.response.data);
        console.log(ex.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      {loginErrors && (
        <div className="alert alert-danger rentAlert">{loginErrors}</div>
      )}
      <div className="login-form">
        <form>
          <h1 className="login-header">Login form</h1>
          <div className="form-group">
            <label className="login-label" htmlFor="formGroupEmail">
              Your e-mail
            </label>
            <input
              onChange={(event) => setLoginEmail(event.target.value)}
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
              onChange={(event) => setLoginPassword(event.target.value)}
              type="password"
              className="form-control"
              id="formGroupPassword"
            />
          </div>

          <button
            onClick={onClickHandler}
            type="button"
            className="login-button btn btn-primary"
          >
            Log in
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
