import React from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <CurrentDeals />
      <Categories />
      <ListProducts />
    </div>
  );
}

export default Home;
