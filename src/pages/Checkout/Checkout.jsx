import { useContext, useState, useEffect } from "react";
import styles from "./checkout.module.css";
import { SvgIcon } from "@mui/material";
import AddDirection from "../../components/AddDirection/AddDirection";
import CheckoutPreferences from "../../components/CheckoutPreferences/CheckoutPreferences";
import DeliveryTime from "../../components/DeliveryTime/DeliveryTime";
import AddPhoneNumber from "../../components/AddPhoneNumber/AddPhoneNumber";
import SelectPaymentMethod from "../../components/SelectPaymentMethod/SelectPaymentMethod";
import { UserContext } from "../../context/UserContext";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import PaypalExpressBtn from "react-paypal-express-checkout";

import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  const { user, carrito, setUser, setCarrito } = useContext(UserContext);
  const Date1 = new Date();
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoCodesByUser, setPromoCodesByUser] = useState([]);

  const handleApplyPromoCode = async () => {
    const promosRef = collection(db, "promos");

    const myQuery = query(
      promosRef,
      where("promoCode", "==", promoCodeInput.toUpperCase())
    );
    const myDoc = await getDocs(myQuery);

    if (!myDoc.size) {
      alert("Codigo de promocion no valido!");
    } else {
      console.log("PROMOCODE EXISTS");
      if (!user.appliedPromos.includes(promoCodeInput.toUpperCase())) {
        myDoc.forEach(async (item) => {
          if (price > item.data().descuento) {
            setPrice(price - item.data().descuento);
          } else {
            setPrice(0);
          }
          alert("Se aplico el codigo de promocion");
          promoCodesByUser.push(promoCodeInput.toUpperCase());
          const userRef = doc(db, "users", user.id);
          setUser({ ...user, appliedPromos: promoCodesByUser });
          await updateDoc(userRef, {
            appliedPromos: promoCodesByUser,
          });
        });
      } else {
        alert("Ya ha usado este codigo de promocion");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setAddresses(user.direcciones);
      setTotalAmount(carrito.reduce((a, b) => a + b.montoTotal, 0));
      setPrice(
        values.delivery +
          values.tasaServicio +
          values.impuestos +
          carrito.reduce((a, b) => a + b.montoTotal, 0)
      );
      setPromoCodesByUser(user.appliedPromos);
    }
  }, [carrito]);

  const [directionClick, setDirectionClick] = useState(false);
  const [deliveryTimeClick, setDeliveryTimeClick] = useState(false);
  const [deliveryInstructionsClick, setDeliveryInstructionsClick] =
    useState(false);
  const [phoneNumberClick, setPhoneNumberClick] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);

  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [addresses, setAddresses] = useState("");
  const [address, setAddress] = useState({
    lineAddress1: "",
    lineAddress2: "",
    zipCode: "",
    deliveryInstructions: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payment, setPayment] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const values = {
    delivery: 1.0,
    tasaServicio: 0.5,
    impuestos: 0.5,
  };

  const compraRealizada = async () => {
    console.log("ENTRA");
    await setDoc(doc(db, `historial`, uniqid()), {
      fecha:
        Date1.getFullYear() +
        "-" +
        (Date1.getMonth() + 1) +
        "-" +
        Date1.getDate(),
      carrito: carrito,
      total: price,
      idUser: user.id,
      telefono: phoneNumber,
      instruccionDelivery: deliveryInstructions,
      direccion: address,
      horaEntrega: selectedTime,
    });
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      carrito: [],
    });
    localStorage.setItem("carrito", "[]");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    user.carrito = JSON.parse(localStorage.getItem("carrito"));
    alert("Compra realizada");
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.left}>
        <div className={styles.directions}>
          {directionClick ? (
            <AddDirection
              addresses={addresses}
              setAddresses={setAddresses}
              address={address}
              setAddress={setAddress}
              setDirectionClick={setDirectionClick}
              directionClick={directionClick}
              setNext={setDeliveryTimeClick}
            />
          ) : (
            <CheckoutPreferences
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                </svg>
              }
              title="Direccion de la entrega"
              subtitle={address.lineAddress1}
              setDirectionClick={setDirectionClick}
              directionClick={directionClick}
            />
          )}
        </div>

        <div className={styles.DeliveryTime}>
          {deliveryTimeClick ? (
            <DeliveryTime
              setDirectionClick={setDeliveryTimeClick}
              directionClick={deliveryTimeClick}
              setNext={setDeliveryInstructionsClick}
              setSelectedTime={setSelectedTime}
            />
          ) : (
            <CheckoutPreferences
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z" />
                </svg>
              }
              title="Hora de entrega"
              subtitle={selectedTime}
              setDirectionClick={setDeliveryTimeClick}
              directionClick={deliveryTimeClick}
            />
          )}
        </div>

        <div className={styles.directions}>
          {deliveryInstructionsClick ? (
            <>
              <div className={styles.directionsTop}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M128 95.1c26.5 0 47.1-21.5 47.1-47.1S154.5 0 128 0S80.01 21.5 80.01 47.1S101.5 95.1 128 95.1zM511.1 95.1c26.5 0 47.1-21.5 47.1-47.1S538.5 0 511.1 0c-26.5 0-48 21.5-48 47.1S485.5 95.1 511.1 95.1zM603.5 258.3l-18.5-80.13c-4.625-20-18.62-36.88-37.5-44.88c-18.5-8-38.1-6.75-56.12 3.25c-22.62 13.38-39.62 34.5-48.12 59.38l-11.25 33.88l-15.1 10.25L415.1 144c0-8.75-7.25-16-16-16H240c-8.75 0-16 7.25-16 16L224 239.1l-16.12-10.25l-11.25-33.88c-8.375-25-25.38-46-48.12-59.38c-17.25-10-37.63-11.25-56.12-3.25c-18.88 8-32.88 24.88-37.5 44.88l-18.37 80.13c-4.625 20 .7506 41.25 14.37 56.75l67.25 75.88l10.12 92.63C130 499.8 143.8 512 160 512c1.25 0 2.25-.125 3.5-.25c17.62-1.875 30.25-17.62 28.25-35.25l-10-92.75c-1.5-13-7-25.12-15.62-35l-43.37-49l17.62-70.38l6.876 20.38c4 12.5 11.87 23.5 24.5 32.63l51 32.5c4.623 2.875 12.12 4.625 17.25 5h159.1c5.125-.375 12.62-2.125 17.25-5l51-32.5c12.62-9.125 20.5-20 24.5-32.63l6.875-20.38l17.63 70.38l-43.37 49c-8.625 9.875-14.12 22-15.62 35l-10 92.75c-2 17.62 10.75 33.38 28.25 35.25C477.7 511.9 478.7 512 479.1 512c16.12 0 29.1-12.12 31.75-28.5l10.12-92.63L589.1 315C602.7 299.5 608.1 278.3 603.5 258.3zM46.26 358.1l-44 110c-6.5 16.38 1.5 35 17.88 41.63c16.75 6.5 35.12-1.75 41.62-17.88l27.62-69.13l-2-18.25L46.26 358.1zM637.7 468.1l-43.1-110l-41.13 46.38l-2 18.25l27.62 69.13C583.2 504.4 595.2 512 607.1 512c3.998 0 7.998-.75 11.87-2.25C636.2 503.1 644.2 484.5 637.7 468.1z" />
                  </svg>
                </SvgIcon>

                <p>Instrucciones para el delivery</p>
              </div>
              <textarea
                name="deliveryInstructions"
                id="deliveryInstructions"
                cols="10"
                rows="4"
                placeholder="Agregar instrucciones para el delivery (Opcional)"
                className={styles.deliveryInstructionsText}
                value={deliveryInstructions}
                onChange={(e) => {
                  setDeliveryInstructions(e.target.value);
                }}
              ></textarea>
              <input
                type="submit"
                value="Continue"
                className={styles.submitBtn}
                onClick={() => {
                  setDeliveryInstructionsClick(!deliveryInstructionsClick);
                  setPhoneNumberClick(true);
                }}
              />
            </>
          ) : (
            <CheckoutPreferences
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M128 95.1c26.5 0 47.1-21.5 47.1-47.1S154.5 0 128 0S80.01 21.5 80.01 47.1S101.5 95.1 128 95.1zM511.1 95.1c26.5 0 47.1-21.5 47.1-47.1S538.5 0 511.1 0c-26.5 0-48 21.5-48 47.1S485.5 95.1 511.1 95.1zM603.5 258.3l-18.5-80.13c-4.625-20-18.62-36.88-37.5-44.88c-18.5-8-38.1-6.75-56.12 3.25c-22.62 13.38-39.62 34.5-48.12 59.38l-11.25 33.88l-15.1 10.25L415.1 144c0-8.75-7.25-16-16-16H240c-8.75 0-16 7.25-16 16L224 239.1l-16.12-10.25l-11.25-33.88c-8.375-25-25.38-46-48.12-59.38c-17.25-10-37.63-11.25-56.12-3.25c-18.88 8-32.88 24.88-37.5 44.88l-18.37 80.13c-4.625 20 .7506 41.25 14.37 56.75l67.25 75.88l10.12 92.63C130 499.8 143.8 512 160 512c1.25 0 2.25-.125 3.5-.25c17.62-1.875 30.25-17.62 28.25-35.25l-10-92.75c-1.5-13-7-25.12-15.62-35l-43.37-49l17.62-70.38l6.876 20.38c4 12.5 11.87 23.5 24.5 32.63l51 32.5c4.623 2.875 12.12 4.625 17.25 5h159.1c5.125-.375 12.62-2.125 17.25-5l51-32.5c12.62-9.125 20.5-20 24.5-32.63l6.875-20.38l17.63 70.38l-43.37 49c-8.625 9.875-14.12 22-15.62 35l-10 92.75c-2 17.62 10.75 33.38 28.25 35.25C477.7 511.9 478.7 512 479.1 512c16.12 0 29.1-12.12 31.75-28.5l10.12-92.63L589.1 315C602.7 299.5 608.1 278.3 603.5 258.3zM46.26 358.1l-44 110c-6.5 16.38 1.5 35 17.88 41.63c16.75 6.5 35.12-1.75 41.62-17.88l27.62-69.13l-2-18.25L46.26 358.1zM637.7 468.1l-43.1-110l-41.13 46.38l-2 18.25l27.62 69.13C583.2 504.4 595.2 512 607.1 512c3.998 0 7.998-.75 11.87-2.25C636.2 503.1 644.2 484.5 637.7 468.1z" />
                </svg>
              }
              title="Instrucciones para el Delivery"
              subtitle={deliveryInstructions}
              setDirectionClick={setDeliveryInstructionsClick}
              directionClick={deliveryInstructionsClick}
            />
          )}
        </div>

        <div className={styles.directions}>
          {phoneNumberClick ? (
            <AddPhoneNumber
              setNext={setPaymentMethod}
              setDirectionClick={setPhoneNumberClick}
              directionClick={phoneNumberClick}
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
            />
          ) : (
            <CheckoutPreferences
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                </svg>
              }
              title="Numero de Telefono"
              subtitle=""
              setDirectionClick={setPhoneNumberClick}
              directionClick={phoneNumberClick}
            />
          )}
        </div>
        <div className={styles.directions}>
          {paymentMethod ? (
            <SelectPaymentMethod
              setDirectionClick={setPaymentMethod}
              directionClick={paymentMethod}
              totalAmount={price.toFixed(2)}
              compraRealizada={compraRealizada}
            />
          ) : (
            <CheckoutPreferences
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M512 32C547.3 32 576 60.65 576 96V128H0V96C0 60.65 28.65 32 64 32H512zM576 416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V224H576V416zM112 352C103.2 352 96 359.2 96 368C96 376.8 103.2 384 112 384H176C184.8 384 192 376.8 192 368C192 359.2 184.8 352 176 352H112zM240 384H368C376.8 384 384 376.8 384 368C384 359.2 376.8 352 368 352H240C231.2 352 224 359.2 224 368C224 376.8 231.2 384 240 384z" />
                </svg>
              }
              title="Metodo de Pago"
              setDirectionClick={setPaymentMethod}
              directionClick={paymentMethod}
            />
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.container}>
          <p className={styles.rightTitle}>Subtotal</p>
          <p className={styles.rightText}>${totalAmount.toFixed(2)}</p>
        </div>
        <div className={styles.container}>
          <p className={styles.rightTitle}>Delivery</p>
          <p className={styles.rightText}>${values.delivery.toFixed(2)}</p>
        </div>
        <div className={styles.container}>
          <p className={styles.rightTitle}>Tasa de servicio</p>
          <p className={styles.rightText}>${values.tasaServicio.toFixed(2)}</p>
        </div>
        <div className={styles.container}>
          <p className={styles.rightTitle}>Impuestos</p>
          <p className={styles.rightText}>${values.impuestos.toFixed(2)}</p>
        </div>
        <hr />
        <div className={styles.container}>
          <p className={styles.rightTitle}>Total</p>
          <p className={styles.rightText}>${price.toFixed(2)}</p>
        </div>
        <hr />

        <div className={styles.promo}>
          <input
            type="text"
            placeholder="PromoCode"
            className={styles.inputPromo}
            value={promoCodeInput}
            onChange={(e) => setPromoCodeInput(e.target.value)}
          />
          <button className={styles.buttonPromo} onClick={handleApplyPromoCode}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
