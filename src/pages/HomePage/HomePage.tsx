import React from "react";

import "./HomePage.css";

import { HomeNav } from "./additionals/HomeNav";
import { HomeInfo } from "./additionals/HomeInfo";
import { HomePopularCoaches } from "./additionals/HomePopularCoaches";
import { HomePrograms } from "./additionals/HomePrograms";
import { User } from "../../interfaces/user.interface";

export const HomePage: React.FunctionComponent<{
  interweavings: Array<any>;
  currentUser: User;
  setCurrentUser: Function;
}> = ({ interweavings, currentUser, setCurrentUser }) => {
  return (
    <React.Fragment>
      <div className="homeBody">
        <HomeNav currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <HomeInfo />
        <div className="site-section">
          <div className="container">
            {" "}
            <div className="row">
              <HomePopularCoaches />
              <HomePrograms interweavings={interweavings} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
