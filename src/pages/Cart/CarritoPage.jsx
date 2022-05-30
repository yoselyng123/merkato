import React from "react";
import Carrito from "../../components/Carrito/Carrito";
import styles from "./carritoPage.module.css";

const CarritoPage = () => {
  return (
    <div className={styles.carritoPage}>
      <Carrito />
    </div>
  );
};

export default CarritoPage;
