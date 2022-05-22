import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import InventarioPage from "./pages/InventarioPage";
import Searcher from "./pages/Searcher/Searcher";
import firebaseExports from "./utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ViewByCategory from "./pages/ViewByCategory/ViewByCategory";
import { UserContext } from "./context/UserContext";
function Rutas() {
  //const [loading, setLoading] = useState(true);
  const [comercios, setComercios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idComercio, setIdComercio] = useState(null);
  const { setCarrito } = useContext(UserContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("carrito")) !== null) {
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }
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

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependency array means useEffect will only run once;

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />}></Route>
      <Route exact path="/inventario" element={<InventarioPage />}></Route>
      <Route
        exact
        path="/search/:name"
        element={<Searcher products={productos} />}
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
        path="/"
        element={
          <Home
            comercios={comercios}
            setProductos={setProductos}
            productos={productos}
            setIdComercio={setIdComercio}
            idComercio={idComercio}
            categorias={categorias}
            setCategorias={setCategorias}
          />
        }
      ></Route>
    </Routes>
  );
}

export default Rutas;
