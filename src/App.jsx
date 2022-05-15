import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Rutas from "./Rutas";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <NavBar />
        <div className={styles.app}>
          <Rutas />
        </div>

        {/* <Home /> */}
      </Router>
    </UserContextProvider>
  );
}

export default App;
