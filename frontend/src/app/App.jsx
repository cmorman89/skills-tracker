import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";
import { useState } from "react";
import MessageTest from "../features/core/message_content/components/MessageTest";
import AddSkillForm from "../features/skills/add_skill_form/AddSkillForm";


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
                    <MainContent
                        pageTitle="Message Display Test"
                        innerComponent={ <AddSkillForm createMessage={createMessage} /> }
                    />
                </div>
            </div>
        </Router>
    );
};

export default App;
