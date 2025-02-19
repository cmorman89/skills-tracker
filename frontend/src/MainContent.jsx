import React from "react";
import SkillForm from "./SkillForm";


const MainContent = () => {
  return (
    <div className="ml-64 -w-64 p-4 flex-grow flex-col items-center justify-items-center bg-indigo-50 min-h-screen rounded-l-3xl">
      <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto mb-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the dashboard! This is where your main content will appear.
        </p>
      </div>
      <SkillForm />
    </div>
  );
};

export default MainContent;