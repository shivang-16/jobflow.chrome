import React, { useEffect, useState } from "react";

const PopupBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch data or handle logic
    chrome.runtime.sendMessage({ action: "get_data" }, (response) => {
      setMessage(response?.data || "No data available");
    });
  }, []);

  return (
    <div className="w-80 font-sans rounded-lg p-5 rounded-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Find Your Job</h2>
      <div className="space-y-4 border-t border-gray-300 pt-4">
        <ToggleOption icon="🔍" label="Search" />
        <ToggleOption icon="🔗" label="LinkedIn" />
        <ToggleOption icon="✉️" label="Ycombinator" />
        <ToggleOption icon="📅" label="Glassdoor" />
        <ToggleOption icon="🌐" label="All websites" />
      </div>
      <div className="border-t border-gray-300 pt-4 mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full text-sm font-medium">
          Refresh Extension
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">{message}</p>
      </div>
    </div>
  );
};

interface ToggleOptionProps {
  icon: string;
  label: string;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ icon, label }) => {
  const [enabled, setEnabled] = useState<boolean>(true);

  const toggle = () => setEnabled(!enabled);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <button
        onClick={toggle}
        className={`px-4 py-1 text-sm font-medium rounded-md transition-colors ${
          enabled
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default PopupBox;