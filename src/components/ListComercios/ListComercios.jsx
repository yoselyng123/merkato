import React, { useContext } from "react";
import Comercio from "../Comercio/Comercio";
import styles from "./listComercios.module.css";
import NoMatch from "../NoMatch/NoMatch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function ListComercios({ comercios, setIdComercio }) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const handleClickComercio = (comercio) => {
    setIdComercio(comercio.id);

    if (user && user.rol === "admin") {
      navigate(`../${comercio.nombre}/${comercio.id}/admin`, { replace: true });
    } 
    else {
      navigate(`../${comercio.nombre}/${comercio.id}/shop`, { replace: true });
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
