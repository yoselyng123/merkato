import React from "react";
import Category from "../Category/Category";
import styles from "./categories.module.css";

function Categories({ categorias, idcomercio, pasillos }) {
  return (
    <div className={styles.categories}>
      <div className={styles.top}>
        <p className={styles.title}>Busqueda por pasillos</p>
      </div>

      <div className={styles.cards}>
        {pasillos.map((pasillo) => (
          <Category
            key={pasillo.id}
            categorias={categorias}
            pasillo={pasillo}
            idcomercio={idcomercio}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
