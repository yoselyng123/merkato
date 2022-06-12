import React from "react";
import Category from "../Category/Category";
import styles from "./categories.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function Categories({ categorias, idcomercio }) {
  return (
    <div className={styles.categories}>
      <div className={styles.top}>
        <p className={styles.title}>Browse by Category</p>
        <div className={styles.arrowsWrapper}>
          <div className={styles.arrowContainer}>
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d="M28.1 36.45 15.55 23.9 28.1 11.35 30.7 13.95 20.75 23.9 30.7 33.85Z" />
              </svg>
            </SvgIcon>
          </div>
          <div className={styles.arrowContainer}>
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path d="M18.75 36.45 16.15 33.85 26.1 23.9 16.15 13.95 18.75 11.35 31.3 23.9Z" />
              </svg>
            </SvgIcon>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        {categorias.map((categoria) => (
          <Category key={categoria.id} data={categoria} idcomercio={idcomercio} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
