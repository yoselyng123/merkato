import React from "react";
import styles from "./detalleProducto.module.css";

function DetalleProducto({ info_producto }) {

  return (
    <div className={styles.infocontent}>
        <img
          src={info_producto.foto_producto}
          alt=""
        />
        <h3 className={styles.nombre}>{info_producto.nombre}</h3>
        <p className={styles.descripcion}>{info_producto.descripcion}</p>
        <div className={styles.infoWrapper}>
            <div className={styles.info}>
                <p className={styles.price}>${info_producto.precio_unidad}</p>
                <p className={styles.text}>average price $1.24/lb</p>
            </div>
            <p className={styles.text2}>Final cost by weight</p>
        </div>
    </div>
  );
}

export default DetalleProducto;
