import { BrowserRouter as Router } from "react-router-dom";
import AppPath from "./AppPath/AppPath";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <AppPath />
      </Router>
    </div>
  );
}

export default App;
