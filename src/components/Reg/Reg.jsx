import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";

import "./Reg.css";

export const Reg = () => {
  const [regErrors, setRegErrors] = useState({});
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const schema = {
    first_name: Joi.string().required().min(2).max(20),
    last_name: Joi.string().required().min(2).max(20),
    email: Joi.string().required().min(6).max(40),
    password: Joi.string().required().min(5),
  };

  const validate = () => {
    setRegErrors({});

    let user = {
      first_name: regFirstName,
      last_name: regLastName,
      email: regEmail,
      password: regPassword,
    };

    const result = Joi.validate(user, schema, { abortEarly: false });

    if (!result.error) {
      return null;
    }

    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const onClickHandler = async () => {
    const errors = validate();
    if (errors) {
      setRegErrors(errors);
      return;
    }

    let user = {
      first_name: regFirstName,
      last_name: regLastName,
      email: regEmail,
      password: regPassword,
    };

    await axios.post("http://localhost:5000/reg", user);
    window.location = "/login";
  };

  return (
    <React.Fragment>
      <div className="reg-form">
        <form>
          <h1 className="reg-header">Registration</h1>
          <div className="form-row">
            <div className="col">
              <label className="reg-label reg-top-label">First name</label>
              <input
                onChange={(event) => setRegFirstName(event.target.value)}
                type="text"
                className="form-control reg-input"
                placeholder="Andrew"
              />
              {regErrors.first_name && (
                <div className="alert alert-danger rentAlert">
                  {regErrors.first_name}
                </div>
              )}
            </div>
            <div className="col">
              <label className="reg-label reg-top-label">Last name</label>
              <input
                onChange={(event) => setRegLastName(event.target.value)}
                type="text"
                className="form-control reg-input"
                placeholder="Buhayov"
              />
              {regErrors.last_name && (
                <div className="alert alert-danger rentAlert">
                  {regErrors.last_name}
                </div>
              )}
            </div>
          </div>
          <div className="form-group reg-bottom-container">
            <label className="reg-label" htmlFor="formGroupRegEmail">
              Email
            </label>
            <input
              onChange={(event) => setRegEmail(event.target.value)}
              type="text"
              className="form-control reg-input"
              id="formGroupRegEmail"
              placeholder="something@gmail.com"
            />
            {regErrors.email && (
              <div className="alert alert-danger rentAlert">
                {regErrors.email}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="reg-label" htmlFor="formGroupRegPassword">
              Password
            </label>
            <input
              onChange={(event) => setRegPassword(event.target.value)}
              type="password"
              className="form-control reg-input"
              id="formGroupRegPassword"
            />
            {regErrors.password && (
              <div className="alert alert-danger rentAlert">
                {regErrors.password}
              </div>
            )}
          </div>

          <button
            onClick={onClickHandler}
            type="button"
            className="reg-button btn btn-primary"
          >
            Sign Up
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
