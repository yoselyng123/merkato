import React from "react";
import styles from "./comercio.module.css";

function Comercio({ data }) {
  return (
    <div className={styles.comercio}>
      <div className={styles.imgContainer}>
        <img src={data.foto} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{data.nombre}</h1>
        <h1 className={styles.subtitle}>delivery by 12:00am</h1>
      </div>
    </div>
  );
}

export default Comercio;
