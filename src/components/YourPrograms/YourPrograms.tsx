import React from "react";
import { useHistory } from "react-router-dom";
import { Interweaving } from "../../interfaces/inreweaving.interface";
import { User } from "../../interfaces/user.interface";
import http from "../../services/httpService";

import "./YourPrograms.css";

export const YourPrograms: React.FunctionComponent<{
  interweavings: Array<Interweaving>;
  currentUser: User;
  setInterweavings: Function;
}> = ({ interweavings, currentUser, setInterweavings }) => {
  const history = useHistory();

  const onClickViewHandler = (id: number) => {
    history.push(`/currentProgram/?id=${id}`);
  };
  const onClickEditHandler = (id: number) => {
    history.push(`/editProgram/?id=${id}`);
  };

  const onClickDeleteHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    let tempInterweavings = interweavings.filter(
      (item) => item.id !== Number(e.currentTarget.id)
    );

    setInterweavings(tempInterweavings);

    await http.delete(`http://localhost:5000/interweavings/${id}`);
    await http.delete(`http://localhost:5000/programs/${id}`);
  };

  let yourPrograms = interweavings.filter(
    (item) => item.user_id === currentUser.id
  );

  yourPrograms.map((program) => (program.user.first_name = "You"));
  yourPrograms.map((program) => (program.user.last_name = ""));

  return (
    <React.Fragment>
      <h1 className="allProgramsHeader" id="allProgramsHeader">
        Your Programs
      </h1>
      {yourPrograms &&
        yourPrograms.map((item: any) => (
          <div
            key={item.id}
            className="d-block d-md-flex podcast-entry bg-white mb-5"
            data-aos="fade-up"
            style={{
              boxShadow: "0 5px 40px -10px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              className="image"
              style={{
                width: "300px",
                height: "auto",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: `url('${item.program.photo}')`,
              }}
            ></div>
            <div
              className="text ml-4"
              style={{
                width: "calc(100% - 300px)",
                padding: "40px",
              }}
            >
              <h3 className="font-weight-light">
                <p
                  style={{
                    color: "#3ca59d",
                  }}
                  className="homeProgramItemHeader"
                >
                  {item.program.name}: {item.program.description}
                </p>
              </h3>
              <div className="mb-3">
                <span className="text-black-opacity-05">
                  <small
                    style={{
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: 400,
                    }}
                  >
                    By {item.user.first_name} {item.user.last_name}{" "}
                    <span className="sep">/</span> {item.program.date}{" "}
                  </small>
                </span>
              </div>
              <div>
                <button
                  onClick={() => onClickViewHandler(item.id)}
                  type="button"
                  className="btn btn-primary mr-3"
                >
                  View the program
                </button>
                <button
                  onClick={() => onClickEditHandler(item.id)}
                  type="button"
                  className="btn btn-warning mr-3"
                >
                  Edit the program
                </button>
                <button
                  id={item.id}
                  onClick={(e) => onClickDeleteHandler(e, item.id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete the program
                </button>
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};
