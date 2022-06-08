import React from "react";
import styles from "./Pago.module.css";
import { Link, useNavigate } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { UserContext } from "../../context/UserContext";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import uniqid from "uniqid";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Pago = ({ totalAmount }) => {
  const Date1 = new Date();
  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
  };
  const [error, setError] = useState(null);
  const { user, setCarrito, carrito } = useContext(UserContext);
  const [subtotal, setSubtotal] = useState(0);
  const [impuestos, setImpuestos] = useState(0);
  const [env, setEnv] = useState("sandbox");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [client, setClient] = useState({
    sandbox:
      "AdSJSUQxGGwUaz8PJL0prKyFrTStKFpUSd9sxhhrqCVZGNHBY84e-kjKqXpi9b09qZPFiyrZaNcpIcop",
    production: "YOUR-PRODUCTION-APP-ID",
  });
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = useState({
    tipo: "Cita 1 Hora",
    especialista: "Hola",
    precio: 29,
  });
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  // };
  useEffect(() => {
    calcularTotales();
    // console.log(Date1.toLocaleDateString("es-ES"));
  });

  const calcularTotales = () => {
    let suma = 0;
    //console.log('******************************')
    suma = suma + committedFieldsToAdd.precio;
    setSubtotal(suma);
    //console.log(parseInt(subtotal));
    setImpuestos(subtotal * 0.16);
    setAmount(subtotal + impuestos);
  };

  const onError = (err) => {
    setError("Error, por favor verifique y vuelva a intentarlo.");
    //console.log(err);
  };
  const onSuccess = (suc) => {
    console.log("BIEEEN");
    compraRealizada();
    //console.log(suc);
  };

  const onCancel = (canc) => {
    setError("Se canceló su operación.");
    console.log("MAAAAL");
    //console.log(canc);
  };
  const compraRealizada = async () => {
    console.log("ENTRA");
    await setDoc(doc(db, `historial`, uniqid()), {
      fecha: Date1,
      carrito: carrito,
      total: totalAmount,
      idUser: user.id,
    });
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      carrito: [],
    });
    localStorage.setItem("carrito", "[]");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    user.carrito = JSON.parse(localStorage.getItem("carrito"));
    handleClickHome();
  };

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: 2,
  //         },
  //       },
  //     ],
  //   });
  // };

  // const onApprove = (data, actions) => {
  //   console.log("BIEEEEN");
  // };
  // const onCancel1 = (data, action) => {
  //   console.log("MAAALL");
  // };
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
          <span className={styles.precio}>${totalAmount}</span>

          <h2 className={styles.subTituloPrecio}>Delivery</h2>
          <span className={styles.precio}>$0</span>

          <hr />
          <span></span>
          <h2 className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            Total
          </h2>
          <label className={`${styles.subTituloPrecio} ${styles.tituloTotal}`}>
            ${totalAmount}
          </label>
        </div>
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
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={totalAmount}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                className={styles.btnPaypal}
                style={{
                  color: "white",
                  size: "responsive",
                  shape: "pill",
                  label: "pay",
                }}
              />
              // <PayPalButton
              //   createOrder={(data, actions) => createOrder(data, actions)}
              //   onApprove={(data, actions) => onApprove(data, actions)}
              //   onCancel={(data, actions) => onCancel1(data, actions)}
              // />
            )
          )}

          <button
            className={`${styles.button} ${styles.btn2}`}
            onClick={handleClickHome}
          >
            Seguir Comprando
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Pago;
