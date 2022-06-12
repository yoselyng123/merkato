import React, { useState, useContext } from "react";
import styles from "./ProductoCarrito.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { UserContext } from "../../context/UserContext";
import AddButton from "../AddButton/AddButton";
const ProductoCarrito = ({
  img,
  nombreProducto,
  cantidad,
  precio,
  stock,
  id,
  handleDeleteCarrito,
  idComercio,
}) => {
  const [quantity, setQuantity] = useState(cantidad);
  const { modificarCantidadCarrito } = useContext(UserContext);
  const handleClick = (type) => {
    if (type === "+") {
      if (quantity < stock) {
        setQuantity(quantity + 1);
        console.log(type)
        modificarCantidadCarrito("+", id, quantity, precio, idComercio);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        modificarCantidadCarrito("-", id, quantity, precio, idComercio);
      }
    }
    console.log(type)
  };

  return (
    <div className={styles.containers}>
      <picture className={styles.boxImg}>
        <img src={img} alt="" className={styles.img} />
      </picture>
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            <h2 className={styles.nombreProducto}>{nombreProducto}</h2>
            <div className={styles.precioDisponible}>
              <h6 className={styles.precioUnitario}>${precio}</h6>
              <h6 className={styles.disponible}>Disponible</h6>
            </div>
          </div>
          <h2 className={styles.precioTotal}>
            ${(precio * quantity).toFixed(2)}
          </h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.addMore}>
            <picture
              className={styles.addMoreIconsBox}
              onClick={() => handleClick("-")}
            >
              <SvgIcon className={styles.addMoreIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="15px"
                  width="15px"
                >
                  <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                </svg>
              </SvgIcon>
            </picture>
            <span className={styles.addMoreSpan}>{quantity}</span>
            <picture
              className={styles.addMoreIconsBox}
              onClick={() => handleClick("+")}
            >
              <SvgIcon className={styles.addMoreIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="15px"
                  width="15px"
                >
                  <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                </svg>
              </SvgIcon>
            </picture>
          </div>

          <div className={styles.downRightSide}>
            <button
              className={styles.buttonDelete}
              onClick={() => handleDeleteCarrito(id)}
            >
              Delete
            </button>
            {/* <button className={styles.buttonSave}>Save</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCarrito;
