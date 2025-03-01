import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";
import { useState } from "react";
import MessageTest from "../features/core/message_content/components/MessageTest";


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
                        innerComponents={[
                            <MessageContent
                                key="MessagesContent"
                                message={message}
                                setMessageVisible={setMessageVisible}
                                type={messageType}
                                visible={messageVisible}
                            />,
                            <MessageTest key="1" createMessage={createMessage} />
                        ]}
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
