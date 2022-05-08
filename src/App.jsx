import "./App.module.css";
import styles from "./App.module.css";
import SideBar from "./components/SideBar/SideBar";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
