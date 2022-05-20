import React from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListComercios from "../../components/ListComercios/ListComercios";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";

function Home({ products, comercios }) {
  return (
    <div className={styles.home}>
      <CurrentDeals />
      {/*<Categories />*/}
      <ListComercios comercios={comercios} />
      {/*<ListProducts products={products} />*/}
    </div>
  );
}

export default Home;
