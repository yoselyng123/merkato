import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import InventarioPage from "./pages/InventarioPage";
import Searcher from "./pages/Searcher/Searcher";
import firebaseExports from "./utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { UserContext } from "./context/UserContext";
function Rutas() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { carrito, setCarrito } = useContext(UserContext);
  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")));

    const getProductsFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(
        collection(firebaseExports.db, "producto")
      );
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        getProductsFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      console.log(getProductsFromFirebase);
      setProducts(getProductsFromFirebase);
      setLoading(false);
    };

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependency array means useEffect will only run once;

  /* if (loading) {
    return <div>Loading...</div>;
  } */

  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />}></Route>
      <Route exact path="/inventario" element={<InventarioPage />}></Route>
      <Route
        exact
        path="/search/:name"
        element={<Searcher products={products} />}
      ></Route>
      <Route exact path="/" element={<Home products={products} />}></Route>
    </Routes>
  );
}

export default Rutas;
