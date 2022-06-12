import React from "react";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";

function Category({ pasillo, idcomercio }) {
  let navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`../searchBy/${idcomercio}/pasillos/${id}`, { replace: true });
  };

  return (
    <div className={styles.category} onClick={() => handleCategoryClick(pasillo.id)}>
{/*       <div className={styles.imgWrapper}>
        <img src={data.icono} alt="" />
      </div> */}
      <div className={styles.text}>
        <p>{pasillo.numero}</p>
      </div>
    </div>
  );
}

export default Category;
