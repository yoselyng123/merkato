import React from "react";
import Product from "../Product/Product";
import styles from "./listProducts.module.css";

function ListProducts() {
  return (
    <div className={styles.listProducts}>
      <p className={styles.title}>All Products</p>

      <div className={styles.productsContainer}>
        <Product />
      </div>
    </div>
  );
}

export default ListProducts;
