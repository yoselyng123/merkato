import React from "react";
import styles from "./DetalleFactura.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import ProductoCarrito from "../ProductoCarrito/ProductoCarrito";
import ProductoFactura from "../ProductoFactura/ProductoFactura";
import { useNavigate } from "react-router-dom";
const DetalleFactura = ({
  total,
  fecha,
  idCarrito,
  idUser,
  carrito,
  descripcion,
  click,
}) => {
  const { user, setCarrito } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();
  const volverComprar = async () => {
    const userRef = doc(db, "users", user.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    user.carrito = JSON.parse(localStorage.getItem("carrito"));
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    await updateDoc(userRef, {
      carrito: JSON.parse(localStorage.getItem("carrito")),
    });
    navigate("/carrito", { replace: true });
  };
  useEffect(() => {
    if (user) {
      const getProductsFromFirebase = [];
      const subscriber = async () => {
        const querySnapshot = await getDocs(collection(db, "producto"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);

          if (carrito.findIndex((i) => i.id === doc.id) > -1) {
            const numeroEnlaLista = carrito.findIndex((i) => i.id === doc.id);
            getProductsFromFirebase.push({
              ...doc.data(),
              id: doc.id,
              cantidad_solicitada: carrito[numeroEnlaLista].quantity,
            });
          }
        });

        console.log(getProductsFromFirebase);
        setProducts(getProductsFromFirebase);
      };

      // return cleanup function
      return () => subscriber();
    }
  }, []);
  return (
    <div className={styles.infocontent}>
      <div className={styles.exitbutton} onClick={() => click()}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </SvgIcon>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.upContainer}>
          <div className={styles.leftSide}>
            <div className={styles.containerColumnas}>
              <h4 className={styles.titleUp}>Fecha de orden</h4>
              <p>{fecha}</p>
            </div>
            <div className={styles.containerColumnas}>
              <h4 className={styles.titleUp}>Total</h4>
              <p className={styles.price}>${total}</p>
            </div>
            <div className={styles.containerColumnas}>
              <h4 className={styles.titleUp}>Enviado a</h4>
              <p>Jesus</p>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.containerFila}>
              <h3 className={styles.titleUp}>Orden # </h3>
              <h3 className={styles.nombre}>{idCarrito}</h3>
            </div>
            <button className={styles.comprar} onClick={() => volverComprar()}>
              Volver a Comprar
            </button>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.priceWrapper}></div>
          {products.length > 0 &&
            products.map((product) => (
              <ProductoFactura
                key={product.id}
                img={product.foto_producto}
                nombreProducto={product.nombre}
                cantidad={product.cantidad_solicitada}
                precio={product.precio_unitario}
                stock={product.stock}
                id={product.id}
                // handleDeleteCarrito={handleDeleteCarrito}
                idComercio={product.id_comercio}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetalleFactura;
