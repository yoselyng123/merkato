import React, { useState, useContext } from "react";
import styles from "./addbutton.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
function AddButton({ data }) {
  const [click, setClick] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { carrito, agregarACarrito, modificarCantidadCarrito, user } =
    useContext(UserContext);

  const handleClick = (type) => {
    // console.log(data.id_comercio);

    if (type === "minus") {
      if (quantity === 1) {
        setClick(!click);

        modificarCantidadCarrito(
          "-",
          data.id,
          quantity,
          data.precio_unitario,
          data.id_comercio,
          data.stock
        );
        setQuantity(0);
        console.log("Entra");

        // eliminarProductoCarrito(data.id);
      } else {
        setQuantity(quantity - 1);
        modificarCantidadCarrito(
          "-",
          data.id,
          quantity,
          data.precio_unitario,
          data.id_comercio,
          data.stock
        );
      }
    } else {
      if (
        (carrito[carrito.findIndex((i) => i.id === data.id)] &&
          carrito[carrito.findIndex((i) => i.id === data.id)].quantity >=
            data.stock) ||
        quantity > data.stock
      ) {
        if (carrito[carrito.findIndex((i) => i.id === data.id)].quantity > 0) {
          setQuantity(
            carrito[carrito.findIndex((i) => i.id === data.id)].quantity
          );
        } else {
          setClick(false);
        }

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

      setQuantity(quantity + 1);
      if (user == null) {
        if (carrito.findIndex((i) => i.id === data.id) === -1) {
          agregarACarrito(
            data.id,
            quantity,
            data.precio_unitario,
            data.id_comercio,
            data.stock
          );
        } else {
          modificarCantidadCarrito(
            "+",
            data.id,
            quantity,
            data.precio_unitario,
            data.id_comercio,
            data.stock
          );
        }
      } else {
        if (user.carrito.findIndex((i) => i.id === data.id) === -1) {
          agregarACarrito(
            data.id,
            quantity,
            data.precio_unitario,
            data.id_comercio,
            data.stock
          );
        } else {
          modificarCantidadCarrito(
            "+",
            data.id,
            quantity,
            data.precio_unitario,
            data.id_comercio,
            data.stock
          );
        }
      }
    }
  };

  return (
    <div className={styles.addContainer}>
      {click ? (
        <div className={styles.addMoreContainer}>
          <div
            className={styles.addMoreIconContainer}
            onClick={() => handleClick("minus")}
          >
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
              </svg>
            </SvgIcon>
          </div>
          <p className={styles.addText}>{quantity} added</p>
          <div
            className={styles.addMoreIconContainer}
            onClick={() => handleClick("plus")}
          >
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
              </svg>
            </SvgIcon>
          </div>
        </div>
      ) : (
        <div
          className={styles.addProductContainer}
          onClick={() => {
            setClick(!click);
            handleClick("plus");
          }}
        >
          <div className={styles.addMoreIconContainer}>
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
              </svg>
            </SvgIcon>
          </div>

          <p className={styles.addText}>Add</p>
        </div>
      )}
    </div>
  );
}

export default AddButton;
