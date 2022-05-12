import React from "react";
import styles from "./AgregarProducto.module.css";
const AgregarProducto = () => {
  return (
    <div className={styles.pago}>
      <div className={styles.boxFotoProducto}>
        <picture className={styles.boxImg}>
          <img src="" alt="" />
        </picture>
        <button className={`${styles.buttonFoto} ${styles.buttonAgregarFot}`}>
          Agregar Foto
        </button>
      </div>
      <div className={styles.inputsBox}>
        <label htmlFor="nombreProducto">Nombre: </label>
        <input type="text" id="nombreProducto" />
        <label htmlFor="cantidadProducto">Cantidad: </label>
        <input type="number" min={1} id="cantidadProducto" />
        <label htmlFor="precioProducto">Precio: $</label>
        <input type="number" min={0.1} />
        <label htmlFor="categoria">Categoria: </label>
        <input type="text" id="categoria" />
        <div className={styles.inputButtons}>
          <button className={styles.btnAgregarProd}>Agregar Producto</button>
          <button className={styles.btnLimpiarProd}>Limpiar</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
