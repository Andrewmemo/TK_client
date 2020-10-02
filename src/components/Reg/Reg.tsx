import React from "react";

import "./Reg.css";

export const Reg: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="reg-form">
        <form>
          <h1 className="reg-header">Registration</h1>
          <div className="form-row">
            <div className="col">
              <label className="reg-label reg-top-label">First name</label>
              <input
                type="text"
                className="form-control reg-input"
                placeholder="Andrew"
              />
            </div>
            <div className="col">
              <label className="reg-label reg-top-label">Last name</label>
              <input
                type="text"
                className="form-control reg-input"
                placeholder="Buhayov"
              />
            </div>
          </div>
          <div className="form-group reg-bottom-container">
            <label className="reg-label" htmlFor="formGroupRegEmail">
              Email
            </label>
            <input
              type="text"
              className="form-control reg-input"
              id="formGroupRegEmail"
              placeholder="something@gmail.com"
            />
          </div>
          <div className="form-group">
            <label className="reg-label" htmlFor="formGroupRegPassword">
              Password
            </label>
            <input
              type="password"
              className="form-control reg-input"
              id="formGroupRegPassword"
            />
          </div>
          <button type="button" className="reg-button btn btn-primary">
            Log in
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
