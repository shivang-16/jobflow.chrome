import React, { useState } from "react";
import ReactDom from "react-dom/client";
import "../static/tailwind.css";
import PopupBox from "./_components/popup_ui";

const App: React.FC = () => {

  return (
    <PopupBox/>
  );
};

// create root and append to body
const root = document.createElement("div");
document.body.appendChild(root);
// add class to root
root.classList.add("root");

const rootElement = document.querySelector(".root");

ReactDom.createRoot(rootElement).render(<App />);
