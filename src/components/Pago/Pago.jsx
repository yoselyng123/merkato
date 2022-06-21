import React from "react";
import styles from "./Pago.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { SvgIcon } from "@mui/material";

const Pago = ({ totalAmount }) => {
  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
  };
  const handleAlertlogin = () => {
    toast(() => (
      <span style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <SvgIcon style={{ fill: "#FFCC00", fontSize: "1.5rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
          </svg>
        </SvgIcon>
        Debe iniciar sesion para proceder con la compra!
      </span>
    ));
  };
  const handleClickCheckout = () => {
    navigate("/store/checkout", { replace: true });
  };
  const { user } = useContext(UserContext);

  return (
    <div className={styles.pago}>
      <h2>Factura</h2>

      <div style={styles.total}>
        <hr />
        <div className={styles.subtotal}>
          <h2 className={styles.subTituloPrecio}>Subtotal</h2>
          <span className={styles.precio}>${totalAmount}</span>

          <hr />
          <span></span>
          <h2 className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            Total
          </h2>
          <label className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            ${totalAmount}
          </label>
        </div>
        <hr />

        <div className={styles.buttons}>
          {!user ? (
            <button
              className={`${styles.button} ${styles.btn1}`}
              onClick={handleAlertlogin}
            >
              Proceder a Pagar
            </button>
          ) : (
            user.carrito.length > 0 && (
              <button
                className={`${styles.button} ${styles.btn1}`}
                onClick={handleClickCheckout}
              >
                Proceder a Pagar
              </button>
            )
          )}

          <button
            className={`${styles.button} ${styles.btn2}`}
            onClick={handleClickHome}
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
