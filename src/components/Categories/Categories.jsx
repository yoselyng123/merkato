import React from "react";
import Category from "../Category/Category";
import styles from "./categories.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function Categories() {
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
        <Category
          tag="Fruits"
          img="https://cdn-icons-png.flaticon.com/512/1625/1625048.png"
        />
        <Category
          tag="Breads & Sweets"
          img="https://cdn-icons-png.flaticon.com/512/3348/3348101.png"
        />
        <Category
          tag="Vegetables"
          img="https://cdn-icons-png.flaticon.com/512/2921/2921726.png"
        />
        <Category
          tag="Frozen Seafoods"
          img="https://cdn-icons-png.flaticon.com/512/2271/2271030.png"
        />
        <Category
          tag="Raw Meats"
          img="https://cdn-icons-png.flaticon.com/512/2224/2224325.png"
        />
        <Category
          tag="Alcohol Drinks"
          img="https://cdn-icons-png.flaticon.com/512/920/920582.png"
        />
        <Category
          tag="Coffees & Teas"
          img="https://cdn-icons-png.flaticon.com/512/3082/3082010.png"
        />
        <Category
          tag="Snacks"
          img="https://cdn-icons-png.flaticon.com/512/3050/3050268.png"
        />
        <Category
          tag="Milks & Dairies"
          img="https://cdn-icons-png.flaticon.com/512/373/373024.png"
        />
        <Category
          tag="Cleaning"
          img="https://cdn-icons-png.flaticon.com/512/994/994928.png"
        />
      </div>
    </div>
  );
}

export default Categories;
