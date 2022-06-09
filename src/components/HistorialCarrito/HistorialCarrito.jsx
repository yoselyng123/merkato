import React from "react";
import styles from "./HistorialCarrito.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const HistorialCarrito = ({
  total,
  fecha,
  idCarrito,
  idUser,
  carrito,
  descripcion,
  click,
}) => {
  const Date1 = new Date(fecha);
  return (
    <div className={styles.containers}>
      {/* <picture className={styles.boxImg}>
        <img alt="" className={styles.img} />
      </picture> */}
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            {/* <Link to="/"> */}
            <h1
              className={styles.nombreProducto}
              onClick={() =>
                click(
                  carrito,
                  Date1.toLocaleDateString(),
                  "Descripcion",
                  total,
                  idUser,
                  idCarrito
                )
              }
            >
              {idCarrito}
            </h1>
            {/* </Link> */}
            <div className={styles.divDescripcion}>
              <span className={styles.descripcion}>descripcion</span>
              <span className={styles.descripcion}>
                {Date1.toLocaleDateString()}
              </span>
            </div>
          </div>
          <h2 className={styles.precioTotal}>${total}</h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.downRightSide}>
            <button
              className={styles.buttonDelete}
              //   onClick={() => handleDeleteCarrito(id)}
            >
              Agregar a favoritos
            </button>
            {/* <button className={styles.buttonSave}>Save</button> */}
            <button
              className={styles.comprar}
              //   onClick={() => handleDeleteCarrito(id)}
            >
              Volver a Comprar
            </button>
          </div>
          <button
            className={styles.ver}
            onClick={() =>
              click(
                carrito,
                Date1.toLocaleDateString(),
                "Descripcion",
                total,
                idUser,
                idCarrito
              )
            }
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistorialCarrito;
