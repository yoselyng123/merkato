import React from "react";
import Category from "../Category/Category";
import styles from "./categories.module.css";

function Categories() {
  return (
    <div className={styles.categories}>
        <p className={styles.title}>Categories</p>
        <div className={styles.cards}>
            <Category tag="Fruits" img="https://cdn-icons-png.flaticon.com/512/1625/1625099.png" />
            <Category tag="Bread" img="https://cdn-icons-png.flaticon.com/512/3348/3348075.png" />
            <Category tag="Vegetable" img="https://cdn-icons-png.flaticon.com/512/765/765544.png" />
            <Category tag="Fish" img="https://cdn-icons.flaticon.com/png/512/3005/premium/3005150.png?token=exp=1651817854~hmac=13bbbed1ddd0b538aa7c33f468a3c750" />
            <Category tag="Meat" img="https://cdn-icons-png.flaticon.com/512/2224/2224259.png" />
        </div>
    </div>
  );
}

export default Categories;
