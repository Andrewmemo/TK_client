import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import http from "./services/httpService";

import "bootstrap/dist/css/bootstrap.css";

import { Routes } from "./Routes";

const App = () => {
  
  const [currentUser, setCurrentUser] = useState({});
  const [interweavings, setInterweavings] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    let decoded;
    if (jwt) {
      decoded = jwtDecode(jwt);
    }
    if (decoded) setCurrentUser( decoded.user);

    const fetchAllPrograms = async () => {
      const { data } = await http.get(process.env.REACT_APP_API_URL+"interweavings/");
      setInterweavings(data);
    }
    fetchAllPrograms();
  }, [])

  return (
    <Routes currentUser = {currentUser} setCurrentUser = {setCurrentUser} interweavings = {interweavings} setInterweavings = {setInterweavings}/>
  )

};

export default App;
