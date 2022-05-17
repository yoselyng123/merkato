import React from "react";
import styles from "./Inventario.module.css";
import ProductoInventario from "../ProductoInventario/ProductoInventario";
import AgregarProducto from "../AgregarProducto/AgregarProducto";
const Inventario = () => {
  return (
    <div className={styles.containers}>
      <div className={styles.productos}>
        <h1>Inventario</h1>
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
        <ProductoInventario
          img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png"
          nombreProducto="Bread"
          cantidad="1"
          precio="2"
        />
      </div>
      <AgregarProducto />
    </div>
  );
};

export default Inventario;
