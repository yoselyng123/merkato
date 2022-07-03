import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Rutas from "./Rutas";
import UserContextProvider from "./context/UserContext";
import { useEffect, useState } from "react";

/* Utils */
import firebaseExports from "./utils/firebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import Logo from "./components/Logo/Logo";

const auth = firebaseExports.auth;

function App() {
  const [user, setUser] = useState(null);
  const [namesElements, setNamesElements] = useState([]);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    const subscriber = async () => {
      const getNamesFromFirebase = [];

      const querySnapshotComercios = await getDocs(
        collection(firebaseExports.db, "comercio")
      );

      const ProductosFromFirebase = [];
      await getDocs(query(collection(firebaseExports.db, "producto"))).then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            ProductosFromFirebase.push(doc.data().nombre);
          });
        }
      );
      const ComerciosFromFirebase = [];
      querySnapshotComercios.forEach((doc) => {
        ComerciosFromFirebase.push(doc.data().nombre);
      });

      getNamesFromFirebase.push(ProductosFromFirebase.sort());
      getNamesFromFirebase.push(ComerciosFromFirebase.sort());
      setNamesElements(getNamesFromFirebase);
    };

    subscriber();

    console.log(namesElements);
  }, []);

  return (
    <UserContextProvider>
      <Router>
        <Toaster position="bottom-right" reverseOrder={true} />
        <Link to="/" className={styles.fullSizelogo}>
          <Logo />
        </Link>
        <NavBar user={user} namesElements={namesElements} />
        <div className={styles.app}>
          <Rutas />
        </div>

        {/* <Home /> */}
      </Router>
    </UserContextProvider>
  );
}

export default App;
