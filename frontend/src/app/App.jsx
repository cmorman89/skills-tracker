import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../features/core/sidebar/components/Sidebar";
import MainContent from "../features/core/main_content/components/MainContent";


const App = () => {
    return (
        <Router>
            <div className="flex min-h-screen px-8 py-12 gap-8">
                <Sidebar />
                <MainContent />
            </div>
        </Router>
    );
};

export default App;
