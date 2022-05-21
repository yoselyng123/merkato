import React from "react";
import Comercio from "../Comercio/Comercio";
import styles from "./listComercios.module.css";
import NoMatch from "../NoMatch/NoMatch";

function ListComercios({ comercios, handleClickComercio }) {
  return (
    <div className={styles.listComercios}>
      {comercios.length > 0 ? (
        <div>
          <p className={styles.title}>All SuperMarket</p>
          <div className={styles.comerciosContainer}>
            {comercios.map((comercio) => (
              <div
                key={comercio.id}
                onClick={() => handleClickComercio(comercio)}
              >
                <Comercio data={comercio} />
              </div>
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
