import React from "react";

import "../HomePage.css";

export const HomeInfo: React.FunctionComponent = () => {
  return (
    <div className="container pt-5 hero">
      <div className="row align-items-center text-center text-md-left">
        <div className="col-lg-4">
          <h1 className="mb-3 display-3">You're on the board too</h1>
          <p>
            Join with us! Share your workout program with the world or subscribe
            for others program. There is always something to find
          </p>
        </div>
        <div className="col-lg-8">
          <img
            src="https://i.ibb.co/f2DMKj3/banner-bg-1.png"
            alt="Coach"
            className="infoCoach"
          />
        </div>
      </div>
    </div>
  );
};
