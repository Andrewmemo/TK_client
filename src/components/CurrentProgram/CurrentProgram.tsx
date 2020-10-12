import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import http from "../../services/httpService";
import { Interweaving } from "../../interfaces/inreweaving.interface";

import "./CurrentProgram.css";

export const CurrentProgram: React.FunctionComponent = () => {
  const [currentProgram, setCurrentProgram] = useState<Interweaving>({
    id: 0,
    user_id: 0,
    role_id: 0,
    program_id: 0,
    user: {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      photo: "",
      password: "",
    },
    role: {
      id: 0,
      name: "",
    },
    program: {
      id: 0,
      name: "",
      description: "",
      photo: "",
      date: "",
      content: [],
    },
  });

  useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    async function fetchCurrentProgram() {
      const { data } = await http.get(
        `http://localhost:5000/interweavings/${id}`
      );

      setCurrentProgram(data);
    }

    fetchCurrentProgram();
  }, []);

  return (
    <div className="container mt-4 currentProgramContainer">
      <div className="row">
        <div className="col-8 currentProgramInfo">
          <h1 className="currentProgramName">{currentProgram.program.name}</h1>
          <p className="currentProgramBy">
            By {currentProgram.user.first_name} {currentProgram.user.last_name}
          </p>
          <p className="currentProgramDescription">
            Description : {currentProgram.program.description}{" "}
          </p>
        </div>
        <div className="col-4">
          <img
            alt="Current program"
            className="currentProgramImg"
            src={currentProgram.program.photo}
          ></img>
        </div>
      </div>
      <div className="row currentPageContentCOntainer">
        <div className="col-12 currentPageContent">
          <p className="currentPageContentHeader">Content</p>
          {currentProgram.program.content.map((item) => (
            <p key={currentProgram.program.content.indexOf(item)}>{item}</p>
          ))}
          <Link to="/">
            <button
              type="button"
              className="btn btn-primary mt-5 currentPageContentButton"
            >
              Back to home page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
