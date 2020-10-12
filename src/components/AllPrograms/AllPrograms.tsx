import React from "react";
import { useHistory } from "react-router-dom";
import { Interweaving } from "../../interfaces/inreweaving.interface";

import "./AllPrograms.css";

export const AllPrograms: React.FunctionComponent<{
  interweavings: Array<Interweaving>;
}> = ({ interweavings }) => {
  const history = useHistory();

  const onClickViewHandler = (id: number) => {
    history.push(`/currentProgram/?id=${id}`);
  };
  return (
    <React.Fragment>
      <h1 className="allProgramsHeader" id="allProgramsHeader">
        All Programs
      </h1>
      {interweavings &&
        interweavings.map((item: any) => (
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
                  className="btn btn-primary"
                >
                  View the program
                </button>
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};
