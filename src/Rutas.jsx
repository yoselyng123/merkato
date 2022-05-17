import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import InventarioPage from "./pages/InventarioPage";
function Rutas() {
  return (
    <Routes>
      <Route exact path="/carrito" element={<CarritoPage />}></Route>
      <Route exact path="/inventario" element={<InventarioPage />}></Route>
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default Rutas;
