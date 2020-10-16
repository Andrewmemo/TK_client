import React, { useEffect, useState } from "react";
import { Interweaving } from "../../../interfaces/inreweaving.interface";
import http from "../../../services/httpService";

import "../HomePage.css";

export const HomePopularCoaches: React.FunctionComponent = () => {
  const [popularCoaches, setPopularCoaches] = useState<Interweaving[]>([]);

  useEffect(() => {
    async function fectCoaches() {
      const { data } = await http.get(process.env.REACT_APP_API_URL + "interweavings/");

      let finalArray = data.filter(
        ((set) => (f: Interweaving) =>
          !set.has(f.user_id) && set.add(f.user_id))(new Set())
      );

      setPopularCoaches(finalArray);
    }

    fectCoaches();
  }, []);

  return (
    <div className="col-3">
      <div className="featured-user mb-5 mb-lg-0">
        <h3 className="mb-4">Popular Coaches</h3>
        <ul className="list-unstyled">
          {popularCoaches &&
            popularCoaches.map((item) => (
              <li key={item.id}>
                <a href="/" className="d-flex align-items-center">
                  <img
                    alt={item.user.last_name}
                    src={item.user.photo}
                    className="img-fluid mr-2"
                  />
                  <div className="podcaster">
                    <span className="d-block">
                      {item.user.first_name} {item.user.last_name}
                    </span>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
