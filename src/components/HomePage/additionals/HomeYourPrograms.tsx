import React from "react";

export const HomeYourPrograms: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="yourPrograms-container">
        <h1 className="yourPrograms-header">Your programs</h1>
        <div className="row flex-row-reverse yourPrograms-items">
          <div className="col-8">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="viewPrograms-button">
              <button type="button" className="btn btn-info">
                {" "}
                View your programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
