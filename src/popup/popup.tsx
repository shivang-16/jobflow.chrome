import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";
import "../static/tailwind.css";
import PopupBox from "./_components/popup_ui";
import getTokenFromBackground from "../actions/getCookie";
import LoginButton from "../components/shared/LoginButton/LoginButton";

const App: React.FC = () => {

  const [token, setToken] = useState('')
  useEffect(() => {
    (async() => {
      const jwt_token = await getTokenFromBackground() as string
      setToken(jwt_token)
    })()
  })
  return (
    token ? <PopupBox /> : <LoginButton/>
  );
};

// create root and append to body
const root = document.createElement("div");
document.body.appendChild(root);
// add class to root
root.classList.add("root");

const rootElement = document.querySelector(".root");

ReactDom.createRoot(rootElement).render(<App />);
