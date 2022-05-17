import "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Rutas from "./Rutas";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Rutas />
      </div>

      {/* <Home /> */}
    </Router>
  );
}

export default App;
