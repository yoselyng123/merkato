import React from "react";
import styles from "./category.module.css";

function Category({ tag, img }) {
  return (
    <div className={styles.category}>
      <div className={styles.imgWrapper}>
        <img src={img} alt="" />
      </div>
      <div className={styles.text}>
        <p>{tag}</p>
      </div>
    </div>
  );
}

export default Category;
