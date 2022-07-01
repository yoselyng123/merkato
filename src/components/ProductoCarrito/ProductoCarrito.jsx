import React, { useState, useContext } from "react";
import styles from "./ProductoCarrito.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
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
        modificarCantidadCarrito("+", id, quantity, precio, idComercio, stock);
      } else {
        return toast(() => (
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
          >
            <SvgIcon style={{ fill: "#FFCC00", fontSize: "1.5rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
              </svg>
            </SvgIcon>
            La cantidad solicitada es mayor que la disponible!
          </span>
        ));
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        modificarCantidadCarrito("-", id, quantity, precio, idComercio, stock);
      }
    }
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
              <h6 className={styles.precioUnitario}>${precio.toFixed(2)}</h6>
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
            <div
              className={styles.buttonDelete}
              onClick={() => handleDeleteCarrito(id)}
            >
              <SvgIcon style={{ fontSize: "0.8rem", fill: "#494949" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
                </svg>
              </SvgIcon>
              <p>Eliminar</p>
            </div>
            {/* <button className={styles.buttonSave}>Save</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCarrito;
