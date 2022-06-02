import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
/* Pages */
import CarritoPage from "./pages/Cart/CarritoPage";
import Home from "./pages/Home/Home";
import InventarioPage from "./pages/InventarioPage";
import Searcher from "./pages/Searcher/Searcher";
import ViewByCategory from "./pages/ViewByCategory/ViewByCategory";
import Stores from "./pages/Stores/Stores";
/* Utils */
import firebaseExports from "./utils/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./context/UserContext";
import AdminView from "./pages/AdminView/AdminView";

function Rutas() {
  //const [loading, setLoading] = useState(true);
  const [comercios, setComercios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idComercio, setIdComercio] = useState(null);
  const { setCarrito } = useContext(UserContext);
  const [userLogged, setUserLogged] = useState(null);
  const [userRol, setUserRol] = useState(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("carrito")) !== null) {
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }

    const getUserRol = async () => {
      const docSnapshot = await getDoc(
        doc(firebaseExports.db, "users", userLogged)
      );
      const userData = docSnapshot.data();
      const userRole = userData.rol;
      setUserRol(userRole);
      console.log("userData: ", userData);
      console.log("userRol: ", userRol);
    };

    const getComerciosFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(
        collection(firebaseExports.db, "comercio")
      );
      querySnapshot.forEach((doc) => {
        getComerciosFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setComercios(getComerciosFromFirebase);

      //setLoading(false);
    };

    //AQUI ESTOY CREANDO LA REVISION DE SI EL USUARIO ESTA LOGUEADO PARA BUSCAR SU ID EN LA COLLECION Y SU ROL
    const auth = getAuth(firebaseExports.firebaseApp);
    onAuthStateChanged(auth, (user) => {
      // Check for user status
      if (user) {
        // User is signed in.
        setUserLogged(user.uid);
        console.log("userLogged: ", userLogged);
        getUserRol();
      } else {
        // User is signed out.
        console.log("no user logged");
        setUserLogged(null);
        setUserRol(null);
      }
    });

    // return cleanup function
    return () => subscriber();
  }, [setCarrito, userLogged, userRol]);

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />}></Route>
      <Route exact path="/inventario" element={<InventarioPage />}></Route>
      <Route
        exact
        path="/"
        element={
          <Stores
            comercios={comercios}
            setIdComercio={setIdComercio}
            userRol={userRol}
          />
        }
      />
      <Route
        exact
        path="/search/:name"
        element={
          <Searcher
            products={productos}
            idComercio={idComercio}
            categorias={categorias}
          />
        }
      ></Route>
      <Route
        exact
        path="/searchBy/categories/:category"
        element={
          <ViewByCategory idComercio={idComercio} categorias={categorias} />
        }
      ></Route>
      <Route
        exact
        path="/:comercio/shop"
        element={
          <Home
            setProductos={setProductos}
            productos={productos}
            idComercio={idComercio}
            categorias={categorias}
            setCategorias={setCategorias}
          />
        }
      ></Route>
      <Route exact path="/carrito" element={<CarritoPage />} />
      <Route exact path="/inventario" element={<InventarioPage />} />
      <Route
        exact
        path="/:comercio/admin"
        element={
          <AdminView
            setProductos={setProductos}
            productos={productos}
            idComercio={idComercio}
            categorias={categorias}
            setCategorias={setCategorias}
          />
        }
      />
    </Routes>
  );
}

export default Rutas;
