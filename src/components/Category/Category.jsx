import React from "react";
import styles from "./category.module.css";

function Category({ tag, img }) {
  return (
    <div className={styles.category}>
        <img src={img} alt="" />
        <p>{tag}</p>
    </div>
  );
}

export default Category;
