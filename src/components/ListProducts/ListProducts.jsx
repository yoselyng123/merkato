import React from "react";
import Product from "../Product/Product";
import styles from "./listProducts.module.css";
import NoMatch from "../NoMatch/NoMatch";

function ListProducts({ products }) {
  return (
    <div className={styles.listProducts}>
      {products.length > 0 ? (
        <div>
          <p className={styles.title}>All Products</p>
          <div className={styles.productsContainer}>
            {products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>
        </div>
      ) : (
        <NoMatch />
      )}
    </div>
  );
}

export default ListProducts;
