import React from "react";
import styles from "./ProductoCarrito.module.css";
const productoCarrito = () => {
  return (
    <div className={styles.containers}>
      <picture className={styles.boxImg}>
        <img src="" alt="" className={styles.img} />
      </picture>
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            <h2 className={styles.nombreProducto}>nombreProducto</h2>
            <div className={styles.precioDisponible}>
              <h6 className={styles.precioUnitario}>$2.99</h6>
              <h6 className={styles.disponible}>Disponible</h6>
            </div>
          </div>
          <h2 className={styles.precioTotal}>2.99</h2>
        </div>

        <div className={styles.downInfo}>
          <input type="number" min="0" className={styles.cantidad} step="1" />

          <div className={styles.downRightSide}>
            <button className={styles.buttonDelete}>Delete</button>
            <button className={styles.buttonSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default productoCarrito;
