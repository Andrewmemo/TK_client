import React, { useEffect, useState } from "react";
import { Program } from "../../../interfaces/program.interface";
import axios from "axios";

export const HomeAllPrograms: React.FunctionComponent<{
  interweavings: Array<Program>;
  setInterweavings: Function;
}> = ({ interweavings, setInterweavings }) => {
  const [tempProgram, setTempProgram] = useState("");

  useEffect(() => {
    async function fetchAllInterweavings() {
      const { data } = await axios.get("http://localhost:5000/interweavings");

      setInterweavings(data);
    }

    fetchAllInterweavings();
  }, []);

  const showAllContent = (keys: any, values: any) => {
    let allContent = "";

    for (let i = 0; i < keys.length; i++) {
      allContent += `${keys[i]} - ${values[i]}\n`;
    }

    return allContent;
  };

  const onClickAcctive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    let listElement: Element;
    let infoElement: Element;

    if (tempProgram === "") {
      e.currentTarget.className += " active";
      setTempProgram(e.currentTarget.id);
      infoElement = document.querySelector(
        `[aria-labelledby=${e.currentTarget.id}]`
      )!;
      infoElement.className += " active";
    } else {
      listElement = document.getElementById(tempProgram)!;
      listElement.className = "list-group-item list-group-item-action";

      infoElement = document.querySelector(`[aria-labelledby=${tempProgram}]`)!;

      infoElement.className = "allProgramsInfo tab-pane fade show";

      e.currentTarget.className += " active";
      setTempProgram(e.currentTarget.id);
      infoElement = document.querySelector(
        `[aria-labelledby=${e.currentTarget.id}]`
      )!;
      infoElement.className += " active";
    }
  };

  return (
    <React.Fragment>
      <div className="allPrograms-container">
        <h1 className="allPrograms-header">All programs</h1>
        <div className="row">
          <div className="col-7">
            <div className="list-group" id="list-tab" role="tablist">
              {interweavings.map(
                (item: any) =>
                  item.role.name === "coach" && (
                    <a
                      key={item.id}
                      className="list-group-item list-group-item-action"
                      id={`list-${item.id}-list`}
                      data-toggle="list"
                      href={`list-${item.id}`}
                      role="tab"
                      aria-controls={`${item.id}`}
                      onClick={onClickAcctive}
                    >
                      {item.program.name} by {item.user.first_name}{" "}
                      {item.user.last_name}
                    </a>
                  )
              )}
            </div>
          </div>
          <div className="col-5">
            <div className="tab-content" id="nav-tabContent">
              {interweavings.map(
                (item: any) =>
                  item.role.name === "coach" && (
                    <div
                      key={item.id}
                      className="allProgramsInfo tab-pane fade show"
                      id={`list-${item.id}`}
                      role="tabpanel"
                      aria-labelledby={`list-${item.id}-list`}
                    >
                      {showAllContent(
                        Object.keys(item.program.content),
                        Object.values(item.program.content)
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
