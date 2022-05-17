import React from "react";
import styles from "./Pago.module.css";
const Pago = () => {
  return (
    <div className={styles.pago}>
      <div className={styles.deliveryBox}>
        <h2>Delivery</h2>
        <button className={styles.buttonD}>Si</button>
        <button className={styles.buttonD}>No</button>
      </div>
      <div className={styles.promo}>
        <input
          type="text"
          placeholder="PromoCode"
          className={styles.inputPromo}
        />
        <button className={styles.buttonPromo}>Apply</button>
      </div>
      <div style={styles.total}>
        <hr />
        <div className={styles.subtotal}>
          <h2 className={styles.subTituloPrecio}>Subtotal</h2>
          <span className={styles.precio}>$2</span>

          <h2 className={styles.subTituloPrecio}>Delivery</h2>
          <span className={styles.precio}>$0.0</span>

          <h2 className={styles.subTituloPrecio}>Tax</h2>
          <span className={styles.precio}>$0.99</span>
          <hr />
          <span></span>
          <h2 className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            Total
          </h2>
          <label className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            $2.99
          </label>
        </div>
        <div className={styles.buttons}>
          <button className={`${styles.button} ${styles.btn1}`}>
            Proceder a Pagar
          </button>
          <button className={`${styles.button} ${styles.btn2}`}>
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;
