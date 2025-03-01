import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";
import MessageContent from "../features/core/message_content/components/MessageContent";


const App = () => {
    return (
        <Router>
            <div className="flex min-h-screen px-8 py-12 gap-8">
                <Sidebar />
                <div className="flex flex-col flex-grow gap-8">
                    <MessageContent />
                    <MainContent />
                </div>
            </div>
        </Router>
    );
};

export default App;
