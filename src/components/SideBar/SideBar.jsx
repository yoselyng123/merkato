import React from "react";
import Button from "../Button/Button";
import styles from "./sideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <p>Sidebar</p>
      <Button tag="Dashboard" icon="" />
    </div>
  );
}

export default SideBar;
