import React from "react";
import styles from "./home.module.css";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Categories from "../../components/Categories/Categories";
import TopProducts from "../../components/TopProducts/TopProducts";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar />
        <div className={styles.content}>
          <Categories />
          <TopProducts />
        </div>
      </div>
    </div>
  );
}

export default Home;
