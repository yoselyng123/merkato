import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import InventarioPage from "./pages/InventarioPage";
import Searcher from "./pages/Searcher/Searcher";
import firebaseExports from "./utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
function Rutas() {
  const [loading, setLoading] = useState(true);
  const [comercios, setComercios] = useState([]);

  useEffect(() => {
    const getComerciosFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(
        collection(firebaseExports.db, "comercio")
      );
      const querySnapshot2 = await getDocs(
        collection(firebaseExports.db, "comercio")
      );
      querySnapshot.forEach((doc) => {
        getComerciosFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      console.log(getComerciosFromFirebase);
      setComercios(getComerciosFromFirebase);
      setLoading(false);
    };

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependency array means useEffect will only run once;

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />}></Route>
      <Route exact path="/inventario" element={<InventarioPage />}></Route>
      {/*<Route
        exact
        path="/search/:name"
        element={<Searcher products={products} />}
  ></Route>*/}
      {/*<Route exact path="/" element={<Home products={products} />}></Route>*/}

      <Route exact path="/" element={<Home comercios={comercios} />}></Route>
    </Routes>
  );
}

export default Rutas;
