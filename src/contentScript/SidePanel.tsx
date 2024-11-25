import React, { useState } from "react";
import Draggable from "react-draggable";

const SidePanel: React.FC = () => {
  console.log("inisde sidpanel")
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight / 2 });


  const handleStop = (e: any, data: any) => {
    // Decide where the button should rest
    const restX = data.x < window.innerWidth / 2 ? 0 : window.innerWidth - 80; // Rest on left or right
    setPosition({ x: restX, y: data.y });
  };

  console.log(position, "here is the postion")

  return (
    <>
      {/* Draggable button */}
      <Draggable
        axis="both"
        // position={}
        onStop={handleStop}
      >
       <button
        className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-l-lg shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Track Job
      </button>
      </Draggable>

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-bold">Chat Gpt</h2>
          <button
            className="text-xl font-bold text-gray-600 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p>
            <strong>21 employees</strong>
          </p>
          <p>Information Technology & Services</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              cybersecurity
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              web development
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              ads
            </span>
          </div>
          <p className="mt-4">Location: Tallinn, Estonia</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg shadow">
            Save Company
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
