import React, { Component } from "react";
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
import MobxComponent from "./MobxComponent/MobxComponent";
import { observable, action  } from 'mobx';

const todos = observable({
  
  count: 30,

  increment() { this.count++ },

  decrement() { this.count-- },
},{
  increment: action('Plus one'),
  decrement: action('Minus one'),
},)

class Gym extends Component {
  state = {
    currentUser: {},
    interweavings: []
    
  }

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    let decoded;
    if (jwt) {
      decoded = jwtDecode(jwt);
    }
    if (decoded) this.setState({ currentUser: decoded.user });

    const fetchAllPrograms = async () => {
      const { data } = await http.get("http://localhost:5000/interweavings/");
      this.setState({  interweavings: data });
    }
    fetchAllPrograms();

    
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  }

  setInterweavings = inter => {
    this.setState({ interweavings: inter });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                currentUser={this.state.currentUser}
                setCurrentUser={this.setCurrentUser}
                interweavings={this.state.interweavings}
              />
            )}
          />
          <Route path="/mobx" render = {() => (
              <MobxComponent store = {todos}/>
          )}>
              
          </Route>
          <Route
            path="/me"
            component={() => (
              <Profile
                currentUser={this.state.currentUser}
                setCurrentUser={this.setCurrentUser}
              />
            )}
          />
          <Route
            path="/allPrograms"
            component={() => <AllPrograms interweavings={this.state.interweavings} />}
          />
          <Route
            path="/yourPrograms"
            component={() => (
              <YourPrograms
                interweavings={this.state.interweavings}
                currentUser={this.state.currentUser}
                setInterweavings = {this.setInterweavings}
              />
            )}
          />
          <Route path="/currentProgram" component={CurrentProgram} />
          <Route
            path="/createProgram"
            component={() => <CreateProgram currentUser={this.state.currentUser} />}
          />
          <Route
            path="/editProgram"
            component={() => <EditProgram currentUser={this.state.currentUser} />}
          />
          <Route path="/reg" component={Reg} />
          <Route path="/login" component={Login} />
        </Router>
      </React.Fragment>
    );
  }
}


export default Gym;
