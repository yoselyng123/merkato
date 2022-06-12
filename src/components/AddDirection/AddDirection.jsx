import React from "react";
import styles from "./addDirection.module.css";
import { SvgIcon } from "@mui/material";

function AddDirection({ setDirectionClick, directionClick, setNext, next }) {
  return (
    <div className={styles.directions}>
      <div className={styles.directionsTop}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
          </svg>
        </SvgIcon>

        <p>Añadir nueva direccion</p>
      </div>
      <div className={styles.infoForm}>
        <input type="text" placeholder="Linea de direccion 1" />
        <input type="text" placeholder="Linea de direccion 2 (opcional)" />
        <input
          type="text"
          placeholder="Codigo Zip"
          className={styles.zipCode}
        />
        <input
          type="text"
          placeholder="Instrucciones para el delivery (opcional)"
        />
      </div>
      <div className={styles.btnsWrapper}>
        <p onClick={() => setDirectionClick(!directionClick)}>Cancel</p>
        <input
          type="submit"
          value="Save"
          onClick={() => {
            setDirectionClick(!directionClick);
            setNext(true);
          }}
        />
      </div>
    </div>
  );
}

export default AddDirection;
