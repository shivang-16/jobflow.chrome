chrome.runtime.sendMessage("From the content script", (response) => {
  console.log(response);
});

import React from "react";
import ReactDom from "react-dom/client";
import SidePanel from "./_components/SidePanel";

const App: React.FC = () => {
  return <SidePanel/>;
};

// create root and append to body
const root = document.createElement("div");
document.body.appendChild(root);
// add class to root
root.classList.add("root");

const rootElement = document.querySelector(".root");

ReactDom.createRoot(rootElement).render(<App />);
