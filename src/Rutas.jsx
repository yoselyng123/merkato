import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
/* Pages */
import CarritoPage from "./pages/Cart/CarritoPage";
import Home from "./pages/Home/Home";
import Searcher from "./pages/Searcher/Searcher";
import ViewByCategory from "./pages/ViewByCategory/ViewByCategory";
import Stores from "./pages/Stores/Stores";
/* Utils */
import firebaseExports from "./utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AdminView from "./pages/AdminView/AdminView";

import HistorialPage from "./pages/HistorialPage/HistorialPage";
import Checkout from "./pages/Checkout/Checkout";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import MerkaterPage from "./pages/MerkaterPage/MerkaterPage";

function Rutas() {
  //const [loading, setLoading] = useState(true);
  const [comercios, setComercios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idComercio, setIdComercio] = useState(null);
  const [pasillos, setPasillos] = useState([]);

  const subscriber = async () => {
    const getComerciosFromFirebase = [];
    const CategoriasFromFirebase = [];
    const PasillosFromFirebase = [];
    await getDocs(collection(firebaseExports.db, "comercio")).then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getComerciosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setComercios(getComerciosFromFirebase);
        console.log(getComerciosFromFirebase);
      }
    );

    //setLoading(false);
    await getDocs(collection(firebaseExports.db, "categoria")).then(
      (querySnapshot2) => {
        querySnapshot2.forEach((doc) => {
          CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setCategorias(CategoriasFromFirebase);
        console.log(CategoriasFromFirebase);
      }
    );

    await getDocs(collection(firebaseExports.db, "pasillo")).then(
      (querySnapshot3) => {
        querySnapshot3.forEach((doc) => {
          PasillosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setPasillos(PasillosFromFirebase);
        console.log(PasillosFromFirebase);
      }
    );
  };

  useEffect(() => {
    // return cleanup function
    subscriber();
  }, []);

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />} />
      <Route exact path="/store/checkout" element={<Checkout />} />
      <Route
        exact
        path="/"
        element={<Stores comercios={comercios} setIdComercio={setIdComercio} />}
      />
      <Route
        exact
        path="/searchBy/:name"
        element={
          <Searcher
            products={productos}
            idComercio={idComercio}
            categorias={categorias}
          />
        }
      />
      <Route
        exact
        path="/searchBy/:idcomercio/categories/:category/:namecategory"
        element={<ViewByCategory />}
      />
      <Route
        exact
        path="/searchBy/:idcomercio/pasillos/:pasillo"
        element={<ViewByCategory />}
      />
      <Route
        exact
        path="/:comercio/:idcomercio/shop"
        element={
          <Home
            setProductos={setProductos}
            productos={productos}
            categorias={categorias}
            pasillos={pasillos}
          />
        }
      />
      <Route
        exact
        path="/:comercio/:idcomercio/admin"
        element={
          <AdminView
            setProductos={setProductos}
            productos={productos}
            setCategorias={setCategorias}
            categorias={categorias}
          />
        }
      />
      <Route exact path="/historial" element={<HistorialPage />} />
      <Route exact path="/favorites" element={<FavoritesPage />} />
      <Route exact path="/merkater" element={<MerkaterPage />} />
    </Routes>
  );
}

export default Rutas;
