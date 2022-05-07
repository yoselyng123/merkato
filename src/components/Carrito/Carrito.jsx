import React from "react";
import ProductoCarrito from "../ProductoCarrito/ProductoCarrito";
import SideBar from "../SideBar/SideBar";
import styles from "./Carrito.module.css";
const Carrito = () => {
  return (
    <div className={styles.containers}>
      <div className={styles.productos}>
        <h1>Carrito</h1>
        <ProductoCarrito />
        <ProductoCarrito />
        <ProductoCarrito />
        <ProductoCarrito />
        <ProductoCarrito />
      </div>
      <div className={styles.pago}>
        <div className={styles.deliveryBox}>
          <h2>Delivery</h2>
          <button className={styles.button}>Si</button>
          <button className={styles.button}>No</button>
        </div>
        <div className={styles.promo}>
          <input
            type="text"
            placeholder="PromoCode"
            className={styles.inputPromo}
          />
          <button className={styles.buttonPromo}>Apply</button>
        </div>
        <div style={styles.total}>
          <div className={styles.subtotal}>
            <h2>Subtotal</h2>
            <label htmlFor="">$2</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
