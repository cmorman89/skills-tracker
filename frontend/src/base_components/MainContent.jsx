import "react";
import { Routes, Route } from "react-router-dom";
import SkillView from "../views/skill_tree/SkillView";
import SkillAddForm from "../views/skill_add/SkillAddForm";
import SkillListView from "../views/skill_list/SkillListView";
import SourceListView from "../views/source_list/SourceListView";
import SourceAddForm from "../views/source_add/SourceAddForm";


const MainContent = () => {
  return (
    <div className="ml-64 -w-64 p-8 flex-grow flex-col items-center justify-items-center min-h-screen rounded-l-3xl">
      <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto mb-6 bg-slate-800/80 text-slate-300 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-300 mb-6">
          Welcome to the dashboard! This is where your main content will appear.
        </p>
      </div>
      <Routes>
        <Route path="/" element={<SkillView />} />
        <Route path="/skills/add" element={<SkillAddForm />} />
        <Route path="/skills" element={<SkillListView />} />
        <Route path="/skills/tree" element={<SkillView />} />
        <Route path="/sources" element={<SourceListView />} />
        <Route path="/sources/add" element={<SourceAddForm />} />
        <Route path="/examples" element={<SkillView />} />
      </Routes>
    </div>
  );
};

export default MainContent;