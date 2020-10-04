import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import { Login } from "./Login/Login.jsx";
import { Reg } from "./Reg/Reg.jsx";

export const Gym: React.FunctionComponent = () => {
  const [interweavings, setInterweavings] = useState([]);
  const [users, setusers] = useState([]);

  return (
    <React.Fragment>
      <Router>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              interweavings={interweavings}
              setInterweavings={setInterweavings}
            />
          )}
        />
        <Route path="/reg" component={Reg} />
        <Route path="/login" component={Login} />
      </Router>
    </React.Fragment>
  );
};
