import React from "react";
import { useHistory } from "react-router-dom";

export const HomePrograms: React.FunctionComponent<{
  interweavings: Array<any>;
}> = ({ interweavings }) => {
  const history = useHistory();

  const onClickViewHandler = (id: number) => {
    history.push(`/currentProgram/?id=${id}`);
  };

  const onClickAllProgramsHandler = () => {
    history.push("/allPrograms#allProgramsHeader");
  };

  return (
    <div className="col-lg-9">
      {interweavings &&
        interweavings.slice(0, 2).map((item: any) => (
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
      <div className="allProgramsButtonContainer">
        <button
          onClick={onClickAllProgramsHandler}
          type="button"
          className="btn btn-primary homeAllProgramsButton"
        >
          All programs
        </button>
      </div>
    </div>
  );
};
