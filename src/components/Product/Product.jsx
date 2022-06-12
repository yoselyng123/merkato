import React, { useState, useContext } from "react";
import styles from "./product.module.css";
import DetalleProducto from "../DetalleProducto/DetalleProducto";
import ModifyProducto from "../ModifyProducto/ModifyProducto";
import AddButton from "../AddButton/AddButton";
import AddFavorites from "../AddFavorites/AddFavorites";
import DeleteButton from "../DeleteButton/DeleteButton";
import ModifyButton from "../ModifyButton/ModifyButton";
import { UserContext } from "../../context/UserContext";

function Product({
  setProductos,
  data,
  idComercio,
  categorias,
  eliminarProductoFavorito,
}) {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(false);
  const [modify, setModify] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    nombre: "",
    foto_producto: "",
    id: 0,
    descripcion: "",
    precio_unitario: 0,
    idComercio: idComercio,
    stock: 0,
    id_categoria: "",
    pasillo: 0,
  });

  const handleClose = () => {
    setInfo(false);
    setModify(false);
  };

  const handleCardClick = (product, info) => {
    setInfo(!info);
    setItemInfoToState(product);
  };

  const handleModifyClick = (product, modify) => {
    setModify(!modify);
    setItemInfoToState(product);
  };

  const setItemInfoToState = (product) => {
    itemInfo.nombre = product.nombre;
    itemInfo.descripcion = product.descripcion;
    itemInfo.id = product.id;
    itemInfo.foto_producto = product.foto_producto;
    itemInfo.precio_unitario = product.precio_unitario;
    itemInfo.id_categoria = product.id_categoria;
    itemInfo.id_comercio = product.id_comercio;
    itemInfo.stock = product.stock;
    itemInfo.pasillo = product.pasillo;
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

      {modify === true && (
        <div className={styles.infobackground}>
          <ModifyProducto
            info_producto={itemInfo}
            click={handleClose}
            categorias={categorias}
            setProductos={setProductos}
          />
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

      {user && user.rol === "admin" ? (
        <div className={styles.buttonContainer}>
          <DeleteButton
            data={data}
            setProductos={setProductos}
            idComercio={idComercio}
          />
          <div
            className={styles.modifybutton}
            onClick={(e) => handleModifyClick(data)}
          >
            <ModifyButton />
          </div>
        </div>
      ) : (
        <div className={styles.userbuttonContainer}>
          <AddFavorites
            data={data}
            idComercio={idComercio}
            eliminarProductoFavorito={eliminarProductoFavorito}
          />
          <AddButton data={data} />
        </div>
      )}
    </div>
  );
}

export default Product;
