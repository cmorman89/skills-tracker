import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const App = () => {
  return (
    <div className="flex h-screen bg-indigo-800">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
