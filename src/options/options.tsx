import React from "react";
import ReactDom from "react-dom/client";

const test = <img src="icon.webp" />;
// create root and append to body
const root = document.createElement("div");
document.body.appendChild(root);
// add class to root
root.classList.add("root");

const rootElement = document.querySelector(".root");

ReactDom.createRoot(rootElement).render(test);
