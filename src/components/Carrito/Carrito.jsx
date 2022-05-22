import React from "react";
import Pago from "../Pago/Pago";
import ProductoCarrito from "../ProductoCarrito/ProductoCarrito";
import styles from "./Carrito.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Carrito = () => {
  const { carrito, setCarrito, eliminarProductoCarrito } =
    useContext(UserContext);
  const [products, setProducts] = useState([]);
  console.log(carrito.length);
  const handleDeleteCarrito = (id) => {
    const newArray = products.filter((item) => item.id !== id);
    setProducts(newArray);
    eliminarProductoCarrito(id);
  };
  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem("carrito")) !== null) {
        setCarrito(JSON.parse(localStorage.getItem("carrito")));
      }
      if (JSON.parse(localStorage.getItem("carrito")).length > 0) {
        setCarrito(JSON.parse(localStorage.getItem("carrito")));
        localStorage.setItem(
          "idProducto",
          JSON.parse(localStorage.getItem("carrito"))[0].idComercio
        );
        const CategoriasFromFirebase = [];

        const getProductsFromFirebase = [];

        const subscriber = async () => {
          const querySnapshot = await getDocs(
            collection(
              firebaseExports.db,
              "comercio",
              localStorage.getItem("idProducto"),
              "categorias"
            )
          );
          console.log("Hola");
          querySnapshot.forEach((doc) => {
            CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
          });

          for (let i = 0; i < CategoriasFromFirebase.length; i++) {
            const querySnapshot = await getDocs(
              collection(
                firebaseExports.db,
                "comercio",
                localStorage.getItem("idProducto"),
                "categorias",
                CategoriasFromFirebase[i].id,
                "productos"
              )
            );

            querySnapshot.forEach((doc) => {
              if (
                JSON.parse(localStorage.getItem("carrito")).findIndex(
                  (i) => i.id === doc.id
                ) > -1
              ) {
                const numeroEnlaLista = JSON.parse(
                  localStorage.getItem("carrito")
                ).findIndex((i) => i.id === doc.id);
                getProductsFromFirebase.push({
                  ...doc.data(),
                  id: doc.id,
                  cantidad_solicitada: JSON.parse(
                    localStorage.getItem("carrito")
                  )[numeroEnlaLista].quantity,
                });
              }
            });
          }

          console.log(getProductsFromFirebase);
          setProducts(getProductsFromFirebase);
        };

        // return cleanup function
        return () => subscriber();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={styles.containers}>
      <div className={styles.productos}>
        <h1>Carrito</h1>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductoCarrito
              key={product.id}
              img={product.foto_producto}
              nombreProducto={product.nombre}
              cantidad={product.cantidad_solicitada}
              precio={product.precio_unitario}
              stock={product.stock}
              id={product.id}
              handleDeleteCarrito={handleDeleteCarrito}
              idComercio={
                JSON.parse(localStorage.getItem("carrito"))[0].idComercio
              }
            />
          ))
        ) : (
          <h1>No products found</h1>
        )}
      </div>
      <Pago />
      {/* <div className={styles.pago}>
        <div className={styles.deliveryBox}>
          <h2>Delivery</h2>
          <button className={styles.button}>Si</button>
          <button className={styles.button}>No</button>
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
          <div className={styles.subtotal}>
            <h2>Subtotal</h2>
            <label htmlFor="">$2</label>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Carrito;
