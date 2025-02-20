import { BrowserRouter as Router} from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
