import React from "react";
import Product from "../Product/Product";
import styles from "./topproducts.module.css";

function TopProducts() {
  return (
    <div className={styles.products}>
        <p className={styles.title}>Top Products</p>
        <div className={styles.cards}>
            <Product tag="Fruits" price="20.10$" img="https://cdn-icons-png.flaticon.com/512/1625/1625099.png" />
            <Product tag="Bread" price="20.10$" img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png" />
            <Product tag="Vegetable" price="20.10$" img="https://cdn-icons-png.flaticon.com/512/765/765544.png" />
            <Product tag="Fish" price="20.10$" img="https://cdn-icons.flaticon.com/png/512/3005/premium/3005150.png?token=exp=1651817854~hmac=13bbbed1ddd0b538aa7c33f468a3c750" />
            <Product tag="Meat" price="20.10$" img="https://cdn-icons-png.flaticon.com/512/2224/2224259.png" />
        </div>
    </div>
  );
}

export default TopProducts;
