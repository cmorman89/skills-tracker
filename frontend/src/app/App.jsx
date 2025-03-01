import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";
import { useState } from "react";


const App = () => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info");



    return (
        <Router>
            <div className="flex min-h-screen px-8 py-12 gap-8">
                <Sidebar />
                <div className="flex flex-col flex-grow">
                    <MessageContent 
                        visible={messageVisible}
                        message={message}
                        type={messageType}
                        onClose={() => setMessageVisible(false)}
                    />
                    <MainContent 
                        innerComponents={[]}
                        setMessage={setMessage}
                        setMessageType={setMessageType}
                        setMessageVisible={setMessageVisible}
                        
                    />
                </div>
            </div>
        </Router>
    );
};

export default App;
