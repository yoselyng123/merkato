import React, { useState } from "react";
import styles from "./AddNameFavorite.module.css";
import SvgIcon from "@mui/material/SvgIcon";
const AddNameFavorite = ({
  handleClose,
  values,
  setValues,
  agregarFavoritoCarrito,
}) => {
  const [error, setError] = useState(false);
  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log(values);
    setValues({ ...values, [inputName]: value });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.exitbutton}
        onClick={() => handleClose("", "", "", "", "")}
      >
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </SvgIcon>
      </div>
      <label className={styles.label}>Agregale el nombre a tu mercado:</label>
      <input
        type="text"
        max={10}
        name="nombre"
        className={styles.input}
        onChange={handleOnChange}
      />
      {error && (
        <span className={styles.error}>Necesita agregar un nombre</span>
      )}
      <div className={styles.btnBox}>
        <button className={styles.btnCancelar} onClick={() => handleClose()}>
          Cancelar
        </button>
        <button
          className={styles.btnAceptar}
          onClick={() =>
            values.nombre !== "" ? agregarFavoritoCarrito() : setError(true)
          }
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default AddNameFavorite;
