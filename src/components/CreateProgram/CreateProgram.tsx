import React from "react";

import "./CreateProgram.css";

export const CreateProgram: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="createProg-form">
        <form>
          <h1 className="createProg-header">Create program</h1>
          <div className="form-group createProg-bottom-container">
            <label className="createProg-label" htmlFor="formGroupRegEmail">
              Program name
            </label>
            <input
              type="text"
              className="form-control createProg-input"
              id="formGroupRegEmail"
              placeholder="Shoulders"
            />
          </div>
          <div className="form-group">
            <label className="createProg-label" htmlFor="formGroupRegPassword">
              Description
            </label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              placeholder="Shoulders day"
            ></textarea>
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
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
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
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <button type="button" className="createProg-button btn btn-success">
            Create
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
