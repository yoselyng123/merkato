import React from "react";
import Pago from "../Pago/Pago";
import ProductoCarrito from "../ProductoCarrito/ProductoCarrito";
import styles from "./Carrito.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
const Carrito = () => {
  const { carrito, setCarrito, eliminarProductoCarrito, user } =
    useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    promocode: "",
    direccion: "",
    descripcion: "",
    delivery: true,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [info, setInfo] = useState(true);
  const handleClose = () => {
    if (
      (values.direccion !== "" && values.descripcion !== "") ||
      (!values.delivery && values.descripcion !== "")
    ) {
      if (info === true) {
        setInfo(false);
      } else {
        setInfo(true);
      }
      // navigate("/", { replace: true });
    } else {
      console.log("Epa Epa Epa");
    }
  };

  const handleDeleteCarrito = (id) => {
    const newArray = products.filter((item) => item.id !== id);
    setProducts(newArray);
    eliminarProductoCarrito(id);
  };

  useEffect(() => {
    setTotalAmount(carrito.reduce((a, b) => a + b.montoTotal, 0).toFixed(2));
  }, [carrito]);

  useEffect(() => {
    const subscriber = async () => {
      if (user === null) {
        setCarrito(JSON.parse(localStorage.getItem("carrito")));
      }
      const getProductsFromFirebase = [];
      const querySnapshot = await getDocs(
        collection(firebaseExports.db, "producto")
      );
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        if (user == null) {
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
              cantidad_solicitada: JSON.parse(localStorage.getItem("carrito"))[
                numeroEnlaLista
              ].quantity,
            });
          }
        } else {
          if (user.carrito.findIndex((i) => i.id === doc.id) > -1) {
            const numeroEnlaLista = user.carrito.findIndex(
              (i) => i.id === doc.id
            );
            getProductsFromFirebase.push({
              ...doc.data(),
              id: doc.id,
              cantidad_solicitada: user.carrito[numeroEnlaLista].quantity,
            });
          }
        }
      });

      console.log(getProductsFromFirebase);
      setProducts(getProductsFromFirebase);
    };

    // return cleanup function
    subscriber();
  }, [user, setCarrito]);

  return (
    <div className={styles.containers}>
      {info && (
        <>
          <div className={styles.productos}>
            <h1 className={styles.title}>Carrito</h1>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductoCarrito
                  key={product.id}
                  img={product.foto_producto[0]}
                  nombreProducto={product.nombre}
                  cantidad={product.cantidad_solicitada}
                  precio={product.precio_unitario}
                  stock={product.stock}
                  id={product.id}
                  handleDeleteCarrito={handleDeleteCarrito}
                  idComercio={product.id_comercio}
                />
              ))
            ) : (
              <p className={styles.text}>Your cart is empty</p>
            )}
          </div>
          <hr className={styles.divider} />
          <Pago
            totalAmount={totalAmount}
            click={handleClose}
            values={values}
            setValues={setValues}
          />
        </>
      )}
    </div>
  );
};

export default Carrito;
