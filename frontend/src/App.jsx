import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-indigo-800">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
