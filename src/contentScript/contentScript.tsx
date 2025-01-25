chrome.runtime.sendMessage("From the content script", (response) => {
  console.log(response);
});

import React from "react";
import ReactDom from "react-dom/client";
import SidePanel from "./_components/SidePanel";
import "../static/tailwind.css"

// Create iframe
const iframe = document.createElement('iframe');
iframe.id = 'jobflow-extension-iframe';
// Set iframe styles to make it float and cover the full height
iframe.style.cssText = `
  position: fixed;
  top: 20px;
  border-radius: 10px;
  right: 0;
  height: 75%;
  width: 320px;
  border: none;
  z-index: 2147483647;
  background: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
`;

// Append iframe to body
document.body.appendChild(iframe);

// Wait for iframe to load before injecting content
iframe.onload = () => {
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  const root = iframeDocument.createElement("div");
  root.id = "jobflow-root";
  iframeDocument.body.appendChild(root);

  // Add any required styles to iframe's document
  const style = iframeDocument.createElement('style');
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      overflow: auto;
      width: 100%;
      height: 100%;
    }
    #jobflow-root {
      width: 100%;
      height: 100%;
    }
  `;
  iframeDocument.head.appendChild(style);

  const App: React.FC = () => {
    return <SidePanel />;
  };

  // Render React app inside iframe
  ReactDom.createRoot(root).render(<App />);
};
