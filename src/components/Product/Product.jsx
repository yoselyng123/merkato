import React, { useState } from "react";
import styles from "./product.module.css";
import DetalleProducto from "../DetalleProducto/DetalleProducto";
import AddButton from "../AddButton/AddButton";

function Product({ data, idComercio }) {
  const [info, setInfo] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    nombre: "",
    foto_producto: "",
    id: 0,
    descripcion: "",
    precio_unitario: 0,
    idComercio: idComercio,
  });

  const handleClose = () => {
    setInfo(false);
    console.log("Info set to false");
  };

  const handleCardClick = (product, info) => {
    setInfo(!info);
    itemInfo.nombre = product.nombre;
    itemInfo.descripcion = product.descripcion;
    itemInfo.id = product.id;
    itemInfo.foto_producto = product.foto_producto;
    itemInfo.precio_unitario = product.precio_unitario;
    setItemInfo(itemInfo);
  };

  return (
    <div className={styles.product}>
      {info === true && (
        <div className={styles.infobackground}>
          <div className={styles.infocontainer}>
            <DetalleProducto info_producto={itemInfo} click={handleClose} />
          </div>
        </div>
      )}

      <div
        className={styles.productcontainer}
        onClick={(e) => handleCardClick(data)}
      >
        <div className={styles.imgContainer}>
          <img src={data.foto_producto[0]} alt="" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{data.nombre}</h1>
          <div className={styles.infoWrapper}>
            <p className={styles.price}>${data.precio_unitario}</p>
            <p className={styles.text}>average price $1.24/lb</p>
          </div>
          <p className={styles.text2}>Final cost by weight</p>
        </div>
      </div>

      <AddButton data={data} idComercio={idComercio} />
    </div>
  );
}

export default Product;
