import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import http from "../services/httpService";

import { HomePage } from "./HomePage/HomePage";
import { Login } from "./Login/Login.jsx";
import { Reg } from "./Reg/Reg.jsx";
import { CreateProgram } from "./CreateProgram/CreateProgram.jsx";
import { CurrentProgram } from "./CurrentProgram/CurrentProgram";
import { Profile } from "./Profile/Profile.jsx";
import { AllPrograms } from "./AllPrograms/AllPrograms";
import { YourPrograms } from "./YourPrograms/YourPrograms";
import { EditProgram } from "./EditProgram/EditProgram.jsx";

export const Gym = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [interweavings, setInterweavings] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    let decoded;
    if (jwt) {
      decoded = jwtDecode(jwt);
    }
    if (decoded) setCurrentUser(decoded.user);

    async function fetchAllPrograms() {
      const { data } = await http.get("http://localhost:5000/interweavings/");
      setInterweavings(data);
    }
    fetchAllPrograms();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              interweavings={interweavings}
              setInterweavings={setInterweavings}
            />
          )}
        />
        <Route
          path="/me"
          component={() => (
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        />
        <Route
          path="/allPrograms"
          component={() => <AllPrograms interweavings={interweavings} />}
        />
        <Route
          path="/yourPrograms"
          component={() => (
            <YourPrograms
              interweavings={interweavings}
              setInterweavings={setInterweavings}
              currentUser={currentUser}
            />
          )}
        />
        <Route path="/currentProgram" component={CurrentProgram} />
        <Route
          path="/createProgram"
          component={() => <CreateProgram currentUser={currentUser} />}
        />
        <Route
          path="/editProgram"
          component={() => <EditProgram currentUser={currentUser} />}
        />
        <Route path="/reg" component={Reg} />
        <Route path="/login" component={Login} />
      </Router>
    </React.Fragment>
  );
};
