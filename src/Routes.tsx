import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AllPrograms } from './pages/AllPrograms/AllPrograms';
import { CreateProgram } from './pages/CreateProgram/CreateProgram';
import { CurrentProgram } from './pages/CurrentProgram/CurrentProgram';
import { EditProgram } from './pages/EditProgram/EditProgram';
import { HomePage } from './pages/HomePage/HomePage';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Reg } from './pages/Reg/Reg';
import { YourPrograms } from './pages/YourPrograms/YourPrograms';
import { Interweaving } from './interfaces/inreweaving.interface';
import { User } from './interfaces/user.interface';
import MobxComponent from './pages/MobxComponent/MobxComponent';


type RouteProps = {
    currentUser: User;
    setCurrentUser: Function;
    interweavings: Interweaving[];
    setInterweavings: Function
}

export const Routes: React.FunctionComponent<RouteProps> = ({ currentUser, setCurrentUser, interweavings, setInterweavings }) => {
   
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
                  />
                )}
              />
              <Route path="/mobx" render = {() => (
                  <MobxComponent />
              )}>
                  
              </Route>
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
                    currentUser={currentUser}
                    setInterweavings = {setInterweavings}
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
                component={() => <EditProgram  />}
              />
              <Route path="/reg" component={Reg} />
              <Route path="/login" component={Login} />
            </Router>
          </React.Fragment>
        );
}