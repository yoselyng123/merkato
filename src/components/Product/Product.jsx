import React, { useState } from "react";
import styles from "./product.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function Product({ data }) {
  
  const [click, setClick] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleClick = (type) => {
    if (type === "minus") {
      if (quantity === 1) {
        setClick(!click);
        setQuantity(0);
      } else {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className={styles.product}>

      <div className={styles.imgContainer}>
        <img
          src={data.foto_producto}
          alt=""
        />

        <div className={styles.addContainer}>
          {click ? (
            <div className={styles.addMoreContainer}>
              <div
                className={styles.addMoreIconContainer}
                onClick={() => handleClick("minus")}
              >
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                  </svg>
                </SvgIcon>
              </div>

              <p className={styles.addText}>{quantity}</p>

              <div
                className={styles.addMoreIconContainer}
                onClick={() => handleClick("plus")}
              >
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                  </svg>
                </SvgIcon>
              </div>
            </div>
          ) : (
            <div
              className={styles.addProductContainer}
              onClick={() => {
                setClick(!click);
                handleClick("plus");
              }}
            >
              <div className={styles.addMoreIconContainer}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                  </svg>
                </SvgIcon>
              </div>

              <p className={styles.addText}>Add</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoWrapper}>
          <p className={styles.price}>${data.precio_unidad}</p>
          <p className={styles.text}>average price $1.24/lb</p>
        </div>
        <p className={styles.text2}>Final cost by weight</p>
        <p className={styles.title}>{data.nombre}</p>
        <div className={styles.tagsContainer}>
        </div>
      </div>
    </div>
  );
}

export default Product;