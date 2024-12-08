import React, { useState } from "react";

const PopupBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="jobflow-w-80 jobflow-font-sans jobflow-rounded-lg jobflow-shadow-md jobflow-bg-white">
      <h2 className="jobflow-text-lg jobflow-font-bold jobflow-py-2 jobflow-px-4 jobflow-text-gray-800 jobflow-bg-gray-100">Find Your Job</h2>
      <div className="jobflow-border-t jobflow-border-gray-300">
        {/* Search Jobflow */}
        <button className="jobflow-flex jobflow-items-center jobflow-justify-between jobflow-w-full jobflow-border-b jobflow-text-sm jobflow-font-medium jobflow-px-4 jobflow-py-3 jobflow-bg-white jobflow-hover:bg-gray-200 ">
          <span>🔍 Search Jobflow</span>
        </button>

        {/* Enable Extension Dropdown */}
        <div className="jobflow-relative">
          <button
            onClick={toggleDropdown}
            className="jobflow-flex jobflow-items-center jobflow-justify-between jobflow-w-full jobflow-text-sm jobflow-font-medium jobflow-px-4 jobflow-py-3 jobflow-border-b jobflow-bg-white jobflow-hover:bg-gray-200"
          >
            <span>🔗 Enable Extension</span>
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isDropdownOpen && (
            <div className="jobflow-relative jobflow-w-full jobflow-bg-white jobflow-rounded-md jobflow-border-b">
              <div className="jobflow-p-4 jobflow-space-y-2 jobflow-max-h-52 jobflow-overflow-y-auto">
                <ToggleOption icon="🔗" label="LinkedIn" />
                <ToggleOption icon="✉️" label="Ycombinator" />
                <ToggleOption icon="📅" label="Glassdoor" />
                <ToggleOption icon="🌐" label="All websites" />
              </div>
            </div>
          )}
        </div>
        {/* Refresh Extension */}
        <button className="jobflow-flex jobflow-items-center jobflow-justify-between jobflow-w-full jobflow-border-b jobflow-text-sm jobflow-font-medium jobflow-px-4 jobflow-py-3 jobflow-bg-white jobflow-hover:bg-gray-200 ">
          <span>↻ Refresh Extension</span>
        </button>
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
    <div className="jobflow-flex jobflow-items-center jobflow-justify-between">
      <div className="jobflow-flex jobflow-items-center jobflow-space-x-2">
        <span className="jobflow-text-xl">{icon}</span>
        <span className="jobflow-text-sm jobflow-font-medium jobflow-text-gray-700">{label}</span>
      </div>
      <button
        onClick={toggle}
        className={`jobflow-px-4 jobflow-py-1 jobflow-text-sm jobflow-font-medium jobflow-rounded-md jobflow-transition-colors ${
          enabled
            ? "jobflow-bg-green-500 jobflow-text-white jobflow-hover:bg-green-600"
            : "jobflow-bg-red-500 jobflow-text-white jobflow-hover:bg-red-600"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default PopupBox;
