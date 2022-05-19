import React, { useState } from "react";
import styles from "./product.module.css";
import DetalleProducto from "../DetalleProducto/DetalleProducto";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import AddButton from "../AddButton/AddButton";
function Product({ data }) {
  const [click, setClick] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const {
    carrito,

    agregarACarrito,

    modificarCantidadCarrito,
  } = useContext(UserContext);

  const handleClick = (type) => {
    if (type === "minus") {
      if (quantity === 1) {
        setClick(!click);

        modificarCantidadCarrito("-", data.id, quantity);
        setQuantity(0);
        // eliminarProductoCarrito(data.id);
      } else {
        setQuantity(quantity - 1);
        modificarCantidadCarrito("-", data.id, quantity);
      }
    } else {
      setQuantity(quantity + 1);
      if (carrito.findIndex((i) => i.id === data.id) === -1) {
        agregarACarrito(data.id, quantity);
      } else {
        modificarCantidadCarrito("+", data.id, quantity);
      }
    }
  };

  function Product({ data }) {
    const [info, setInfo] = useState(false);
    const [itemInfo, setItemInfo] = useState({
      nombre: "",
      foto_producto: "",
      id: 0,
      descripcion: "",
      precio_unidad: 0,
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
      itemInfo.precio_unidad = product.precio_unitario;
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

        <AddButton />
      </div>
    );
  }
}

export default Product;
