import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";
import { useState } from "react";
import AddSkillForm from "../features/skills/add_skill_form/components/AddSkillForm";
import SkillTable from "../features/skills/skill_table/components/SkillTable";


const App = () => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");


    const createMessage = (message, type) => {
        if (message !== "") {
            setMessage(message);
            setMessageType(type);
            setMessageVisible(true);
        }
    }

    return (
        <Router>
            <div className="flex min-h-screen ">
                <Sidebar />
                <div className="flex flex-col flex-grow">
                    <MessageContent
                        visible={messageVisible}
                        message={message}
                        type={messageType}
                        setMessageVisible={setMessageVisible}
                    />
                    <Routes>
                        <Route path="/skills/table" element={<MainContent pageTitle="Skills Table" innerComponent={<SkillTable createMessage={createMessage}/>} />} />
                        <Route path="/skills/add" element={<MainContent pageTitle="Add a Skill" innerComponent={<AddSkillForm createMessage={createMessage} />} />} />
                        <Route path="/skills/:skill_id/edit/" element={<MainContent pageTitle="Edit Skill" innerComponent={<AddSkillForm createMessage={createMessage} />} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
