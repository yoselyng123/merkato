import React from "react";
import styles from "./stores.module.css";
import BannerStores from "../../components/BannerStores/BannerStores";
import ListComercios from "../../components/ListComercios/ListComercios";

function Stores({ comercios, setIdComercio }) {
  return (
    <div className={styles.stores}>
      <BannerStores />
      <div style={{ padding: "1% 15%" }}>
        <ListComercios comercios={comercios} setIdComercio={setIdComercio} />
      </div>
    </div>
  );
}

export default Stores;
