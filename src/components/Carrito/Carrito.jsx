import React from "react";
import Pago from "../Pago/Pago";
import ProductoCarrito from "../ProductoCarrito/ProductoCarrito";
import styles from "./Carrito.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "../Loading/Loading";
const Carrito = () => {
  const { carrito, setCarrito, eliminarProductoCarrito, user } =
    useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [comercios, setComercios] = useState([]);
  const [values, setValues] = useState({
    promocode: "",
    direccion: "",
    descripcion: "",
    delivery: true,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [info, setInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleVaciarCarrito = async () => {
    setIsLoading(true);
    if (user) {
      const userRef = doc(firebaseExports.db, "users", user.id);
      await updateDoc(userRef, {
        carrito: [],
      });
      localStorage.setItem("carrito", "[]");
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
      user.carrito = JSON.parse(localStorage.getItem("carrito"));
    } else {
      localStorage.setItem("carrito", "[]");
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }
    setProducts([]);
    setIsLoading(false);
  };
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
  //BORRA PRODUCTO DEL CARRITO
  const handleDeleteCarrito = (id) => {
    const newArray = products.filter((item) => item.id !== id);
    comercios.forEach((i) => {
      if (newArray.findIndex((index) => index.id_comercio === i.id) === -1) {
        const newArrayComercios = comercios.filter((item) => item.id !== i.id);
        setComercios(newArrayComercios);
      }
    });

    // const newArrayComercio = products.filter((item) => item.id !== id);

    setProducts(newArray);
    eliminarProductoCarrito(id);
  };

  useEffect(() => {
    setTotalAmount(carrito.reduce((a, b) => a + b.montoTotal, 0).toFixed(2));
  }, [carrito]);

  useEffect(() => {
    const subscriber = async () => {
      setIsLoading(true);
      if (user === null) {
        setCarrito(JSON.parse(localStorage.getItem("carrito")));
      }
      const getProductsFromFirebase = [];
      const getComerciosFromFirebase = [];
      const querySnapshotComercios = await getDocs(
        collection(firebaseExports.db, "comercio")
      );
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

      querySnapshotComercios.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);

        if (
          getProductsFromFirebase.findIndex((i) => i.id_comercio === doc.id) >
          -1
        ) {
          getComerciosFromFirebase.push({
            ...doc.data(),
            id: doc.id,
          });
        }
      });

      setProducts(getProductsFromFirebase);
      setComercios(getComerciosFromFirebase);
      setIsLoading(false);
    };

    // return cleanup function
    subscriber();
  }, [user, setCarrito]);

  return (
    <div className={styles.containers}>
      {info && !isLoading ? (
        <>
          <div className={styles.productos}>
            <div className={styles.boxTitle}>
              <h1 className={styles.title}>Carrito</h1>
              <button
                className={styles.btnVaciar}
                onClick={handleVaciarCarrito}
              >
                Vaciar Carrito
              </button>
            </div>

            {products.length > 0 && comercios.length > 0 ? (
              comercios.map((comercio) => (
                <div key={comercio.id}>
                  <div className={styles.boxComercio}>
                    <picture className={styles.boxImg}>
                      <img src={comercio.foto} alt="" className={styles.img} />
                    </picture>
                    <h1 className={styles.nombreComercio}>{comercio.nombre}</h1>
                  </div>

                  {products &&
                    products.map(
                      (product) =>
                        product.id_comercio === comercio.id && (
                          <div key={product.id}>
                            <ProductoCarrito
                              img={product.foto_producto[0]}
                              nombreProducto={product.nombre}
                              cantidad={product.cantidad_solicitada}
                              precio={product.precio_unitario}
                              stock={product.stock}
                              id={product.id}
                              handleDeleteCarrito={handleDeleteCarrito}
                              idComercio={product.id_comercio}
                            />
                          </div>
                        )
                    )}
                </div>
              ))
            ) : (
              <p className={styles.text}>Tu carrito esta vacio</p>
            )}
          </div>
          <Pago
            totalAmount={totalAmount}
            click={handleClose}
            values={values}
            setValues={setValues}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Carrito;
