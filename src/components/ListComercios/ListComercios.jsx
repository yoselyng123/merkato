import React, { useState, useEffect } from "react";
import Comercio from "../Comercio/Comercio";
import styles from "./listComercios.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import NoMatch from "../NoMatch/NoMatch";

function ListComercios({ comercios }) {
  console.log(comercios);
  return (
    <div className={styles.listProducts}>
      {comercios.length > 0 ? (
        <div>
          <p className={styles.title}>All SuperMarkets</p>
          <div className={styles.comerciosContainer}>
            {comercios.map((comercio) => (
              <Comercio key={comercio.id} data={comercio} />
            ))}
          </div>
        </div>
      ) : (
        <NoMatch />
      )}
    </div>
  );
}

export default ListComercios;
