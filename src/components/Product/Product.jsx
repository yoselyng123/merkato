import React from "react";
import styles from "./product.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function Product() {
  return (
    <div className={styles.product}>
      <div className={styles.top}>
        <div className={styles.cTag}>
          <p>Best Seller</p>
        </div>
        {/* <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
          </svg>
        </SvgIcon> */}
      </div>

      <div className={styles.imgContainer}>
        <img
          src="https://i5.walmartimages.com/asr/52aacd31-4d97-4c39-a9b5-1974e406bc75.f36f9cabd6e40736da743f7fa93c6fe0.jpeg"
          alt=""
        />
        <div className={styles.addProductContainer}>
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M22.2 38.35V25.8H9.65V22.15H22.2V9.6H25.85V22.15H38.4V25.8H25.85V38.35Z" />
            </svg>
          </SvgIcon>
          <p>Add</p>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoWrapper}>
          <p className={styles.price}>$0,99</p>
          <p className={styles.text}>average price $1.24/lb</p>
        </div>
        {/* <p className={styles.text2}>Final cost by weight</p> */}
        <p className={styles.title}>Yellow Onions, Each</p>
        <div className={styles.tagsContainer}>
          <div className={styles.tag}>
            <p>Pickup</p>
          </div>
          <div className={styles.tag}>
            <p>Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
</svg>; */
}
