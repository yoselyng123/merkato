import React from "react";
import styles from "./Pago.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Pago = ({ totalAmount }) => {
  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
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
              onClick={handleClickHome}
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
