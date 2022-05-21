import React, { useState } from "react";
import styles from "./comercio.module.css";
import DetalleProducto from "../DetalleProducto/DetalleProducto";
import AddButton from "../AddButton/AddButton";

function Comercio({ data }) {

  return (
    <div className={styles.product}>

      <div className={styles.productcontainer}>
        <div className={styles.imgContainer}>
          <img src={data.foto} alt="" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{data.nombre}</h1>
        </div>
      </div>
    </div>
  );
}

export default Comercio;
