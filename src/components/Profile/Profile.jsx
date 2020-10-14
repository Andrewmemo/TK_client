import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import http from "../../services/httpService";
import { useHistory } from "react-router-dom";

import "./Profile.css";

export const Profile = ({ currentUser, setCurrentUser }) => {
  const [profErrors, setProfErrors] = useState({});
  const [profFirstName, setProfFirstName] = useState("");
  const [profLastName, setProfLastName] = useState("");
  const [profPhoto, setProfPhoto] = useState("");
  const [profEmail, setProfEmail] = useState("");
  const [profPassword, setProfPassword] = useState("");

  useEffect(() => {
    setProfFirstName(currentUser.first_name);
    setProfLastName(currentUser.last_name);
    setProfPhoto(currentUser.photo);
    setProfEmail(currentUser.email);
    setProfPassword(currentUser.password);
  }, []);

  const history = useHistory();

  const schema = {
    first_name: Joi.string().required().min(2).max(20),
    last_name: Joi.string().required().min(2).max(20),
    email: Joi.string().required().min(6).max(40),
    password: Joi.string().required().min(5),
  };

  const backToHomepageHandler = () => {
    history.push("/");
  };

  const createProgramHandler = () => {
    history.push("/createProgram");
  };

  const viewYourProgramHandler = () => {
    history.push("/yourPrograms");
  };

  const validate = () => {
    setProfErrors({});

    let user = {
      first_name: profFirstName,
      last_name: profLastName,
      email: profEmail,
      password: profPassword,
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

  const onCLickChangesHandler = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors) {
      setProfErrors(errors);
      return;
    }

    let user = {
      first_name: profFirstName,
      last_name: profLastName,
      photo:
        profPhoto ||
        "https://i.ibb.co/Bz7mbcS/36324eb648f2cb507e243e8030e4dc0a.png",
      email: profEmail,
      password: profPassword,
    };

    const response = await http.put(
      `http://localhost:5000/users/${currentUser.id}`,
      user
    );

    localStorage.removeItem("token");
    localStorage.setItem("token", response.headers["x-tk-login-token"]);

    window.location = "/";
  };

  return (
    <div className="container bootstrap snippet">
      <div className="row">
        <div className="col-sm-10">
          <h1>
            {" "}
            {currentUser.first_name} {currentUser.last_name}
          </h1>
        </div>
      </div>

      <div className="row">
        {" "}
        <div className="col-sm-4">
          <div className="text-center">
            <img
              src={currentUser.photo}
              className="avatar img-circle img-thumbnail profileAvatar"
              alt="avatar"
            />
          </div>

          <ul className="list-group profileButtonContainer">
            <li className="list-group-item text-muted">Activity</li>
            <li className="list-group-item text-center">
              <button
                type="button"
                onClick={viewYourProgramHandler}
                className="btn btn-primary proileButton"
              >
                View your programs
              </button>
            </li>
            <li className="list-group-item text-center">
              <button
                type="button"
                onClick={createProgramHandler}
                className="btn btn-success proileButton"
              >
                Create your program
              </button>
            </li>
            <li className="list-group-item text-center">
              <button
                type="button"
                onClick={backToHomepageHandler}
                className="btn btn-secondary proileButton"
              >
                Back to HomePage
              </button>
            </li>
          </ul>
        </div>
        <div className="col-sm-8">
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <form
                className="form"
                action="##"
                method="post"
                id="registrationForm"
              >
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="first_name">
                      <h4>First name</h4>
                    </label>
                    <input
                      value={profFirstName}
                      onChange={(event) => setProfFirstName(event.target.value)}
                      type="text"
                      className="form-control"
                      name="first_name"
                      id="first_name"
                      placeholder="first name"
                      title="enter your first name if any."
                    />
                    {profErrors.first_name && (
                      <div className="alert alert-danger rentAlert">
                        {profErrors.first_name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="last_name">
                      <h4>Last name</h4>
                    </label>
                    <input
                      value={profLastName}
                      onChange={(event) => setProfLastName(event.target.value)}
                      type="text"
                      className="form-control"
                      name="last_name"
                      id="last_name"
                      placeholder="last name"
                      title="enter your last name if any."
                    />
                    {profErrors.last_name && (
                      <div className="alert alert-danger rentAlert">
                        {profErrors.last_name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="photo">
                      <h4>Photo link</h4>
                    </label>
                    <input
                      value={profPhoto}
                      onChange={(event) => setProfPhoto(event.target.value)}
                      type="text"
                      className="form-control"
                      name="photo"
                      id="photo"
                      placeholder="http://linkToPhoto.com"
                      title="enter your photo if any."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      value={profEmail}
                      onChange={(event) => setProfEmail(event.target.value)}
                      type="email"
                      disabled="disabled"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="something@gmail.com"
                      title="enter your email."
                    />
                    {profErrors.email && (
                      <div className="alert alert-danger rentAlert">
                        {profErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-xs-12">
                    <button
                      onClick={onCLickChangesHandler}
                      className="btn btn-lg btn-success"
                      type="submit"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
