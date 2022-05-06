import React from "react";
import styles from "./home.module.css";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar />
      </div>
    </div>
  );
}

export default Home;
