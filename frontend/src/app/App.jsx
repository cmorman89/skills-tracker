import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";
import { useState } from "react";
import SkillForm from "../features/skills/skill_form/components/SkillForm";
import SkillTable from "../features/skills/skill_table/components/SkillTable";
import SkillTree from "../features/skills/skill_tree/components/SkillTree";
import LandingContent from "../features/landing/LandingContent";

const App = () => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const createMessage = (message, type) => {
    if (message !== "") {
      setMessage(message);
      setMessageType(type);
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 3000);
    }
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <MessageContent
            visible={messageVisible}
            message={message}
            type={messageType}
            setMessageVisible={setMessageVisible}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainContent pageTitle="Landing Page">
                  <LandingContent createMessage={createMessage} />
                </MainContent>
              }
            />
            <Route
              path="/skills/table"
              element={
                <MainContent pageTitle="Skills Table">
                  <SkillTable createMessage={createMessage} />
                </MainContent>
              }
            />
            <Route
              path="/skills/tree"
              element={
                <MainContent pageTitle="Skills Tree">
                  <SkillTree createMessage={createMessage} />
                </MainContent>
              }
            />
            <Route
              path="/skills/add"
              element={
                <MainContent pageTitle="Add a Skill">
                  <SkillForm createMessage={createMessage} />
                </MainContent>
              }
            />
            <Route
              path="/skills/:skill_id/edit/"
              element={
                <MainContent pageTitle="Edit Skill">
                  <SkillForm createMessage={createMessage} />
                </MainContent>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
