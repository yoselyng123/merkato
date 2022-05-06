import React from "react";
import styles from "./navBar.module.css";

import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <SearchIcon sx={{ fill: "#28AF61", fontSize: 30 }} />
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Busca un producto"
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.notification}>
          <NotificationsIcon sx={{ fill: "#95D5B1", fontSize: 30 }} />
        </div>
        <Avatar src="sadsa" />
      </div>
    </div>
  );
}

export default NavBar;
