import React from "react";

export const HomeYourPrograms: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="yourPrograms-container">
        <h1 className="yourPrograms-header">Your programs</h1>
        <div className="row flex-row-reverse">
          <div className="col-8">
            <div className="list-group" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action"
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
              >
                Home
              </a>
              <a
                className="list-group-item list-group-item-action active"
                id="list-profile-list"
                data-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="profile"
              >
                Profile
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="messages"
              >
                Messages
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-settings-list"
                data-toggle="list"
                href="#list-settings"
                role="tab"
                aria-controls="settings"
              >
                Settings
              </a>
            </div>
            <div className="viewPrograms-button">
              <button type="button" className="btn btn-info">
                {" "}
                View your programs
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show"
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                Home
              </div>
              <div
                className="tab-pane fade show active"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                Proile
              </div>
              <div
                className="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                Messages
              </div>
              <div
                className="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
