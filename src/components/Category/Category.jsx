import React from "react";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";

function Category({ data }) {
  let navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`../searchBy/categories/${name}`, { replace: true });
  };

  return (
    <div
      className={styles.category}
      onClick={() => handleCategoryClick(data.name)}
    >
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
