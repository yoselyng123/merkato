import React from "react";
import Product from "../Product/Product";
import styles from "./listProducts.module.css";
import NoMatch from "../NoMatch/NoMatch";

function ListProducts({ products, setProductos, title, idComercio, userRol }) {
  return (
    <div className={styles.listProducts}>
      {products.length > 0 ? (
        <div>
          {title ? (
            <p className={styles.title}>{title}</p>
          ) : (
            <p className={styles.title}>All Products</p>
          )}
          <div className={styles.productsContainer}>
            {products.map((product) => (
              <Product
                key={product.id}
                data={product}
                idComercio={idComercio}
                userRol={userRol}
                setProductos={setProductos}
              />
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
