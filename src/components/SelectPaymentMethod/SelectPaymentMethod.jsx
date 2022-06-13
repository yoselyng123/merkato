import styles from "./selectPaymentMethod.module.css";
import { SvgIcon } from "@mui/material";
import { useState } from "react";

function SelectPaymentMethod({ setDirectionClick, directionClick }) {
  const [payPal, setPayPal] = useState(false);

  return (
    <div className={styles.selectPaymentMethod}>
      <div
        className={styles.directionsTop}
        onClick={() => {
          setDirectionClick(!directionClick);
        }}
      >
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M512 32C547.3 32 576 60.65 576 96V128H0V96C0 60.65 28.65 32 64 32H512zM576 416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V224H576V416zM112 352C103.2 352 96 359.2 96 368C96 376.8 103.2 384 112 384H176C184.8 384 192 376.8 192 368C192 359.2 184.8 352 176 352H112zM240 384H368C376.8 384 384 376.8 384 368C384 359.2 376.8 352 368 352H240C231.2 352 224 359.2 224 368C224 376.8 231.2 384 240 384z" />
          </svg>
        </SvgIcon>

        <p>Metodo de Pago</p>
      </div>

      {!payPal ? (
        <div
          className={styles.option}
          onClick={() => {
            setPayPal(true);
          }}
        >
          <div className={styles.topLeft}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888870.png"
              alt="PayPal"
            />
            <div className={styles.infoWrap}>
              <p className={styles.title}>Paypal</p>
            </div>
          </div>
          <SvgIcon style={{ fill: "#BDBDBD", fontSize: "1.1rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
            </svg>
          </SvgIcon>
        </div>
      ) : (
        <div className={styles.linkPaypal}>
          <p>Enlaza tu cuenta de PayPal para guardarla como metodo de pago</p>
          <div className={styles.btnsWrapper}>
            <div className={styles.btnCancel} onClick={() => setPayPal(false)}>
              <p style={{ color: "#000", fontWeight: "400" }}>Cancel</p>
            </div>
            <div className={styles.btn}>
              <p>PayPal</p>
            </div>
          </div>

          <hr />

          <button>Realizar compra</button>
        </div>
      )}
    </div>
  );
}

export default SelectPaymentMethod;
