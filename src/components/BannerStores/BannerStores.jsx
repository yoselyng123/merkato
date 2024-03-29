import React from "react";
import styles from "./bannerstores.module.css";

function BannerStores() {
  return (
    <div
      className={styles.bannerstores}
      style={{
        backgroundImage: `url('https://as2.ftcdn.net/v2/jpg/02/95/11/35/1000_F_295113591_t9DSmA6R22UOqmgp3OxsfXjOmoi3E9Bx.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "220px",
        transform: "rotate(180deg)",
      }}
    >
      <div className={styles.content} style={{ transform: "rotate(180deg)" }}>
        <p className={styles.title}>Pide tus compras por delivery o pick up.</p>
        <p className={styles.text}>
          Lo que quieras de tus supermercados locales favoritos, llegan hasta la
          puerta de tu casa.
        </p>
      </div>
    </div>
  );
}

export default BannerStores;
