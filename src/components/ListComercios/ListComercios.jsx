import React from "react";
import Comercio from "../Comercio/Comercio";
import styles from "./listComercios.module.css";
import NoMatch from "../NoMatch/NoMatch";
import { useNavigate } from "react-router-dom";

function ListComercios({ comercios, setIdComercio }) {
  let navigate = useNavigate();

  const handleClickComercio = (comercio) => {
    setIdComercio(comercio.id);
    navigate(`../${comercio.nombre}/shop`, { replace: true });
  };

  return (
    <div className={styles.listComercios}>
      {comercios.length > 0 ? (
        <div>
          <p className={styles.title}>All Stores</p>
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
