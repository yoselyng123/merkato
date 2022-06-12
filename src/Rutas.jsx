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
import AdminView from "./pages/AdminView/AdminView";

import { useNavigate } from "react-router-dom";
import HistorialPage from "./pages/HistorialPage/HistorialPage";

function Rutas() {

  //const [loading, setLoading] = useState(true);
  const [comercios, setComercios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idComercio, setIdComercio] = useState(null);

  useEffect(() => {
    const getComerciosFromFirebase = [];
    const CategoriasFromFirebase = [];
    
    const subscriber = async () => {
      await getDocs(
        collection(firebaseExports.db, "comercio")
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getComerciosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setComercios(getComerciosFromFirebase);
      })

      //setLoading(false);
      await getDocs(
        collection(firebaseExports.db, "categoria")
      ).then((querySnapshot2) => {
        querySnapshot2.forEach((doc) => {
          CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setCategorias(CategoriasFromFirebase);
      })
    };

    // return cleanup function
    return () => subscriber();
  }, []);

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />} />
      <Route exact path="/inventario" element={<InventarioPage />} />
      <Route
        exact
        path="/"
        element={
          <Stores
            comercios={comercios}
            setIdComercio={setIdComercio}
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
            setCategorias={setCategorias}
            categorias={categorias}
          />
        }
      />
      <Route exact path="/historial" element={<HistorialPage />} />
    </Routes>
  );
}

export default Rutas;
