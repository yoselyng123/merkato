import "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes />
      </div>

      {/* <Home /> */}
    </Router>
  );
}

export default App;
