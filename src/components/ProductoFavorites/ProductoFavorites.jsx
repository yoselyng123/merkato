import React, { useState } from "react";
import styles from "./ProductoFavorites";
import DetalleProducto from "../DetalleProducto/DetalleProducto";
import AddButton from "../AddButton/AddButton";
import DeleteButton from "../DeleteButton/DeleteButton";

function ProductoFavorites({ setProductos, data, idComercio, userRol }) {
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
            <p className={styles.price}>${data.precio_unitario.toFixed(2)}</p>
            {data.pasillo === 0 || data.pasillo === 1 ? (
              <p className={styles.text}>average price $1.24/lb</p>
            ) : null}
          </div>
          {data.pasillo === 0 || data.pasillo === 1 ? (
            <p className={styles.text2}>Final cost by weight</p>
          ) : null}
        </div>
      </div>

      {userRol === "admin" ? (
        <DeleteButton
          data={data}
          setProductos={setProductos}
          idComercio={idComercio}
        />
      ) : (
        <AddButton data={data} idComercio={idComercio} />
      )}
    </div>
  );
}

export default ProductoFavorites;
