import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Rutas from "./Rutas";
import UserContextProvider from "./context/UserContext";
import { useState } from "react";

/* Utils */
import firebaseExports from "./utils/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = firebaseExports.auth;

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <UserContextProvider>
      <Router>
        <NavBar user={user} />
        <div className={styles.app}>
          <Rutas />
        </div>

        {/* <Home /> */}
      </Router>
    </UserContextProvider>
  );
}

export default App;
