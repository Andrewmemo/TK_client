import React from "react";

import "./HomePage.css";

import { HomeNav } from "./additionals/HomeNav";
import { HomeAllPrograms } from "./additionals/HomeAllPrograms";
import { HomeYourPrograms } from "./additionals/HomeYourPrograms";
import { HomeCreateProgram } from "./additionals/HomeCreateProgram";
import { Program } from "../../interfaces/program.interface";

export const HomePage: React.FunctionComponent<{
  interweavings: Array<Program>;
  setInterweavings: Function;
}> = ({ interweavings, setInterweavings }) => {
  return (
    <React.Fragment>
      <HomeNav />
      <div className="d-flex">
        <div className="homeRight">
          <HomeAllPrograms
            interweavings={interweavings}
            setInterweavings={setInterweavings}
          />
        </div>
        <div className="homeLeft">
          <HomeYourPrograms />
          <HomeCreateProgram />
        </div>
      </div>
    </React.Fragment>
  );
};
