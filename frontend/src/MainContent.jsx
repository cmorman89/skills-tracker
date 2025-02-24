import "react";
import { Routes, Route } from "react-router-dom";
import SkillAdd from "./SkillAdd";
import SkillView from "./SkillView";


const MainContent = () => {
  return (
    <div className="ml-64 -w-64 p-8 flex-grow flex-col items-center justify-items-center bg-slate-950/40 min-h-screen rounded-l-3xl">
      <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto mb-6 bg-slate-800/80 text-slate-300 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-300 mb-6">
          Welcome to the dashboard! This is where your main content will appear.
        </p>
      </div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/skills/add" element={<SkillAdd />} />
        <Route path="/skills/edit/:skill_id" element={<SkillAdd />} />
        <Route path="/skills" element={<SkillView />} />
        <Route path="/skills/:skill_id" element={<SkillView />} />
      </Routes>
    </div>
  );
};

export default MainContent;