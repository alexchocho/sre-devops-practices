import React from "react";
import ReactDOM from "react-dom";
import { NoteApp } from "./NoteApp";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
