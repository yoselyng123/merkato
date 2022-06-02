import React from "react";
import Comercio from "../Comercio/Comercio";
import styles from "./listComercios.module.css";
import NoMatch from "../NoMatch/NoMatch";
import { useNavigate } from "react-router-dom";

function ListComercios({ comercios, setIdComercio, userRol }) {
  let navigate = useNavigate();

  const handleClickComercio = (comercio) => {
    setIdComercio(comercio.id);

    if (userRol === "admin") {
      navigate(`../${comercio.nombre}/admin`, { replace: true });
    } 
    else {
      navigate(`../${comercio.nombre}/shop`, { replace: true });
    }
  };

  return (
    <div className={styles.listComercios}>
      {comercios.length > 0 ? (
        <div>
          <p className={styles.title}>
            Choose your store in
            <span style={{ color: "var(--darkGreen)", fontWeight: "600" }}>
              Caracas
            </span>
          </p>
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
