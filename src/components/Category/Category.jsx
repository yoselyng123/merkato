import React from "react";
import styles from "./category.module.css";

function Category({ data }) {
  return (
    <div className={styles.category}>
      <div className={styles.imgWrapper}>
        <img src={data.icono} alt="" />
      </div>
      <div className={styles.text}>
        <p>{data.name}</p>
      </div>
    </div>
  );
}

export default Category;
