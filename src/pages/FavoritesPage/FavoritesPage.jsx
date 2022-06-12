import React from "react";
import Favorites from "../../components/Favorites/Favorites";
import styles from "./FavoritePage.module.css";
const FavoritesPage = () => {
  return (
    <div className={styles.historiaPage}>
      <Favorites />
    </div>
  );
};

export default FavoritesPage;
