import React from "react";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";

function Category({ data, idcomercio }) {
  let navigate = useNavigate();

  const handleCategoryClick = (nombre) => {
    navigate(`../searchBy/${idcomercio}/categories/${nombre}`, { replace: true });
  };

  return (
    <div
      className={styles.category}
      onClick={() => handleCategoryClick(data.nombre)}
    >
      <div className={styles.imgWrapper}>
        <img src={data.icono} alt="" />
      </div>
      <div className={styles.text}>
        <p>{data.nombre}</p>
      </div>
    </div>
  );
}

export default Category;
