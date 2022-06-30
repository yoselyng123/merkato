import { useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import styles from "./storeProducts.module.css";
import Product from "../Product/Product";

function StoreProducts({
  comerciosSearch, 
  productosSearch}) {
 
  return (
    <div className={styles.productos}>
    <h1 className={styles.title}>Productos por comercio</h1>
    {productosSearch.length > 0 && comerciosSearch.length > 0 ? (
      comerciosSearch.map((comercio) => (
        <>
          <div className={styles.boxComercio}>
            <picture className={styles.boxImg}>
              <img src={comercio.foto} alt="" className={styles.img} />
            </picture>
            <h1 className={styles.nombreComercio}>{comercio.nombre}</h1>
          </div>

          {productosSearch && productosSearch.map(
            (product) =>
              product.id_comercio === comercio.id && (
                <>
                  <Product
                    key={comercio.id}
                    data={product}
                    idComercio={comercio.id}
                  />
                </>
              )
          )}
        </>
      ))
    ) : (
      <p className={styles.text}>Your cart is empty</p>
    )}
  </div>


  )
}

export default StoreProducts;
