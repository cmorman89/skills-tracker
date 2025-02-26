import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./base_components/Sidebar";
import MainContent from "./base_components/MainContent";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
