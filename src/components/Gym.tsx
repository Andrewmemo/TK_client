import React, { useState } from "react";
import { HomePage } from "./HomePage/HomePage";

export const Gym: React.FunctionComponent = () => {
  const [interweavings, setInterweavings] = useState([]);
  const [users, setusers] = useState([]);

  return (
    <HomePage
      interweavings={interweavings}
      setInterweavings={setInterweavings}
    />
  );
};
