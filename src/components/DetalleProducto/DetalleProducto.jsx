import React, { useState } from "react";
import styles from "./detalleProducto.module.css";
import AddButton from "../AddButton/AddButton";
import SvgIcon from "@mui/material/SvgIcon";

function DetalleProducto({ info_producto, click }) {
  const [mainImage, setmainImage] = useState(info_producto.foto_producto[0]);

  return (
    <div className={styles.infocontent}>
      <div className={styles.exitbutton} onClick={() => click()}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </SvgIcon>
      </div>

      <div className={styles.imagesContainer}>
        <div className={styles.smallimagescontainer}>
          {info_producto.foto_producto.map((image, index) => (
            <img
              onClick={(e) => setmainImage(image)}
              key={index}
              className={styles.smallimage}
              src={image}
              alt=""
            />
          ))}
        </div>

        <img className={styles.bigImage} src={mainImage} alt="" />
      </div>

      <div className={styles.infoContainer}>
        <h3 className={styles.nombre}>{info_producto.nombre}</h3>
        <p className={styles.descripcion}>{info_producto.descripcion}</p>
        <div className={styles.priceContainer}>
          <div className={styles.priceWrapper}>
            <p className={styles.price}>${info_producto.precio_unitario}</p>
            <p className={styles.text}>average price $1.24/lb</p>
          </div>
          <p className={styles.text2}>Final cost by weight</p>
        </div>
        <AddButton data={info_producto} idComercio={info_producto.idComercio} />
      </div>
    </div>
  );
}

export default DetalleProducto;
