import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import http from "../../services/httpService";
import queryString from "query-string";
import date from "date-and-time";

import "./EditProgram.css";

let counter = 100;

export const EditProgram = () => {
  const [editProgramName, setEditProgramName] = useState("");
  const [editProgramDescription, setEditProgramDescription] = useState("");
  const [editProgramPhoto, setEditProgramPhoto] = useState("");
  const [editProgramErrors, setEditProgramErrors] = useState({});
  const [editProgramContent, setEditProgramContent] = useState([]);

  useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    async function fetchCurrentProgram() {
      const { data } = await http.get(`${process.env.REACT_APP_API_URL}programs/${id}`);

      setEditProgramName(data.name);
      setEditProgramDescription(data.description);
      setEditProgramPhoto(data.photo);

      const tempContent = [];

      for (let item in data.content) {
        tempContent.push({
          id: Number(item),
          value: data.content[item],
        });
      }

      setEditProgramContent(tempContent);
    }

    fetchCurrentProgram();
  }, []);

  const schema = {
    name: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2).max(255),
  };

  const validate = () => {
    setEditProgramErrors({});

    let program = {
      name: editProgramName,
      description: editProgramDescription,
    };

    const result = Joi.validate(program, schema, { abortEarly: false });

    if (!result.error && editProgramContent.length > 0) {
      return null;
    }

    const errors = {};

    if (!editProgramContent.length) {
      errors["content"] = "Should be at least one item";
    }

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const onClickChangeHandler = async () => {
    const { id } = queryString.parse(window.location.search);
    const errors = validate();
    if (errors) {
      setEditProgramErrors(errors);
      return;
    }

    let contentObj = [];

    for (let i = 0; i < editProgramContent.length; i++) {
      contentObj[`${i}`] = editProgramContent[i].value;
    }
    let now = date.format(new Date(), "D MMMM YYYY");

    let program = {
      name: editProgramName,
      description: editProgramDescription,
      content: contentObj,
      photo:
        editProgramPhoto ||
        "https://i.ibb.co/QJZ3Qd8/94610367-images-12490520061.jpg",
      date: now,
    };

    await http.put(`http://localhost:5000/programs/${id}`, program);

    window.location = "/me";
  };
  const onClickAddHandler = () => {
    const editExercise = document.getElementById("editProgramExercise");
    const editSteps = document.getElementById("editProgramSteps");

    let tempEditContent = [...editProgramContent];

    if (editExercise.value && editSteps.value) {
      let contentItem = `${editExercise.value} - ${editSteps.value}`;
      tempEditContent.push({
        id: counter,
        value: contentItem,
      });
      setEditProgramContent(tempEditContent);

      editExercise.value = "";
      editSteps.value = "";
      counter++;
    }
  };

  const onClickRemoveHandler = (event) => {
    let tempEditContent = [...editProgramContent];

    tempEditContent = tempEditContent.filter(
      (obj) => obj.id !== Number(event.currentTarget.id)
    );

    setEditProgramContent(tempEditContent);
  };

  return (
    <React.Fragment>
      <div className="createProg-form">
        <form>
          <h1 className="createProg-header">Edit program</h1>
          <div className="form-group createProg-bottom-container">
            <label className="createProg-label" htmlFor="createProgramName">
              Program name
            </label>
            <input
              value={editProgramName}
              onChange={(event) => setEditProgramName(event.target.value)}
              type="text"
              className="form-control editProg-input"
              id="editProgramName"
              placeholder="Shoulders"
            />
            {editProgramErrors.name && (
              <div className="alert alert-danger rentAlert">
                {editProgramErrors.name}
              </div>
            )}
          </div>
          <div className="form-group createProg-bottom-container">
            {" "}
            <label className="editProg-label" htmlFor="editProgramPhoto">
              Program photo
            </label>
            <input
              value={editProgramPhoto}
              onChange={(event) => setEditProgramPhoto(event.target.value)}
              type="text"
              className="form-control createProg-input"
              id="editProgramPhoto"
              placeholder="http://linkToPhoto.com"
            />
          </div>

          <div className="form-group">
            <label className="editProg-label" htmlFor="editProgramDescription">
              Description
            </label>
            <textarea
              onChange={(event) =>
                setEditProgramDescription(event.target.value)
              }
              value={editProgramDescription}
              id="editProgramDescription"
              className="form-control"
              resize="none"
              aria-label="With textarea"
              placeholder="Shoulders day"
            ></textarea>
            {editProgramErrors.description && (
              <div className="alert alert-danger rentAlert">
                {editProgramErrors.description}
              </div>
            )}
          </div>
          <div className="d-flex justify-content-sm-between editProgram-headers">
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
                id="editProgramExercise"
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
                id="editProgramSteps"
                type="text"
                className="form-control"
                placeholder="3x15"
                aria-label="SetsxReps"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          {editProgramErrors.content && (
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
              {editProgramContent &&
                editProgramContent.map((item) => (
                  <div key={item.id} className="row editItemContainer">
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
                        className="btn btn-danger editProgramRemoveButton"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <button
            onClick={onClickChangeHandler}
            type="button"
            className="editProg-button btn btn-success"
          >
            Change
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
