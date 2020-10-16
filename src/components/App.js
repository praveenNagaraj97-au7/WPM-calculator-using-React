import React from "react";
import { useDispatch } from "react-redux";

import "../styles/app.scss";
import PreFilledParagraph from "./Paragraph";
import { getParagraph } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  dispatch(getParagraph());
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to typing test</h1>
      {<PreFilledParagraph />}
    </>
  );
};

export default App;
