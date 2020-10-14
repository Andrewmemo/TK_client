import React, { useState } from "react";
import Joi from "joi-browser";
import http from "../../services/httpService";
import date from "date-and-time";

import "./CreateProgram.css";

let counter = 0;

export const CreateProgram = ({ currentUser }) => {
  const [createProgramName, setCreateProgramName] = useState("");
  const [createProgramDescription, setCreateProgramDescription] = useState("");
  const [createProgramPhoto, setCreateProgramPhoto] = useState("");
  const [createProgramErrors, setCreateProgramErrors] = useState({});
  const [createProgramContent, setCreateProgramContet] = useState([]);

  const schema = {
    name: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2).max(255),
  };

  const validate = () => {
    setCreateProgramErrors({});

    let program = {
      name: createProgramName,
      description: createProgramDescription,
    };

    const result = Joi.validate(program, schema, { abortEarly: false });

    if (!result.error && createProgramContent.length > 0) {
      return null;
    }

    const errors = {};

    if (createProgramContent.length === 0) {
      errors["content"] = "Should be at least one item";
    }

    if (result.errors) {
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    }

    return errors;
  };

  const onClickCreateHandler = async () => {
      const errors = validate();
    if (errors) {
      setCreateProgramErrors(errors);
      return;
    }

    let contentObj = [];

    for (let i = 0; i < createProgramContent.length; i++) {
      contentObj.push(createProgramContent[i].value);
    }
    let now = date.format(new Date(), "D MMMM YYYY");

    let program = {
      name: createProgramName,
      description: createProgramDescription,
      content: contentObj,
      photo:
        createProgramPhoto ||
        "https://i.ibb.co/QJZ3Qd8/94610367-images-12490520061.jpg",
      date: now,
    };

    const { data } = await http.post("http://localhost:5000/programs", program);

    let userEntity = {
      user_id: currentUser.id,
      program_id: data.id,
      role_id: 1,
    };

    await http.post("http://localhost:5000/interweavings", userEntity);

    window.location = "/";
  };
  const onClickAddHandler = () => {
    const createExercise = document.getElementById("createProgramExercise");
    const createSteps = document.getElementById("createProgramSteps");

    let tempCreateContent = [...createProgramContent];

    if (createExercise.value && createSteps.value) {
      let contentItem = `${createExercise.value} - ${createSteps.value}`;
      tempCreateContent.push({
        id: counter,
        value: contentItem,
      });
      setCreateProgramContet(tempCreateContent);

      createExercise.value = "";
      createSteps.value = "";
      counter++;
    }
  };

  const onClickRemoveHandler = (event) => {
    let tempCreateContent = [...createProgramContent];

    tempCreateContent = tempCreateContent.filter(
      (obj) => obj.id !== Number(event.currentTarget.id)
    );

    setCreateProgramContet(tempCreateContent);
  };

  return (
    <React.Fragment>
      <div className="createProg-form">
        <form>
          <h1 className="createProg-header">Create program</h1>
          <div className="form-group createProg-bottom-container">
            <label className="createProg-label" htmlFor="createProgramName">
              Program name
            </label>
            <input
              onChange={(event) => setCreateProgramName(event.target.value)}
              type="text"
              className="form-control createProg-input"
              id="createProgramName"
              placeholder="Shoulders"
            />
            {createProgramErrors.name && (
              <div className="alert alert-danger rentAlert">
                {createProgramErrors.name}
              </div>
            )}
          </div>
          <label className="createProg-label" htmlFor="createProgramPhoto">
            Program photo
          </label>
          <input
            onChange={(event) => setCreateProgramPhoto(event.target.value)}
            type="text"
            className="form-control createProg-input"
            id="createProgramPhoto"
            placeholder="http://linkToPhoto.com"
          />
          <div className="form-group">
            <label
              className="createProg-label"
              htmlFor="createProgramDescription"
            >
              Description
            </label>
            <textarea
              onChange={(event) =>
                setCreateProgramDescription(event.target.value)
              }
              id="createProgramDescription"
              className="form-control"
              resize="none"
              aria-label="With textarea"
              placeholder="Shoulders day"
            ></textarea>
            {createProgramErrors.description && (
              <div className="alert alert-danger rentAlert">
                {createProgramErrors.description}
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-between createProgram-headers">
            <h5>Exercise</h5>
            <h5>Sets x Reps</h5>
          </div>
          <div className="form-row">
            <div className="col input-group mb-3">
              <div className="input-group-prepend">
                <span
                  role="img"
                  aria-label="bicycleEmoji"
                  className="input-group-text"
                >
                  &#128170;
                </span>
              </div>
              <input
                id="createProgramExercise"
                type="text"
                className="form-control"
                placeholder="Pushups"
                aria-label="Exercise"
                aria-describedby="basic-addon1"
              />
            </div>{" "}
            <div className="col input-group mb-3">
              <div className="input-group-prepend">
                <span
                  role="img"
                  aria-label="bicycleEmoji"
                  className="input-group-text"
                >
                  &#128258;
                </span>
              </div>
              <input
                id="createProgramSteps"
                type="text"
                className="form-control"
                placeholder="3x15"
                aria-label="SetsxReps"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          {createProgramErrors.content && (
            <div className="alert alert-danger rentAlert">
              Should be at least one item
            </div>
          )}
          <button
            type="button"
            onClick={onClickAddHandler}
            className="btn btn-primary mb-5"
          >
            Add item
          </button>
          <div className="contentItemContainer">
            <div className="container">
              {createProgramContent &&
                createProgramContent.map((item) => (
                  <div key={item.id} className="row createItemContainer">
                    <div className="col-9">
                      <span key={item.value} className="contentItem">
                        {item.value}
                      </span>
                    </div>
                    <div className="col-3">
                      <button
                        onClick={onClickRemoveHandler}
                        id={item.id}
                        type="button"
                        className="btn btn-danger createProgramRemoveButton"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <button
            onClick={onClickCreateHandler}
            type="button"
            className="createProg-button btn btn-success"
          >
            Create
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
