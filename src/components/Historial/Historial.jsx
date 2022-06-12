import React from "react";
import styles from "./Historial.module.css";
import HistorialCarrito from "../HistorialCarrito/HistorialCarrito";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import DetalleFactura from "../DetalleFactura/DetalleFactura";
const Historial = () => {
  const [info, setInfo] = useState(false);
  const { user } = useContext(UserContext);
  const [productos, setProductos] = useState(null);
  const [total, setTotal] = useState(null);
  const [values, setValues] = useState({
    carrito: "",
    fecha: "",
    descripcion: "",
    idUser: "",
    idCarrito: "",
  });

  const handleClose = (
    carrito,
    fecha,
    descripcion,
    total,
    idUser,
    idCarrito
  ) => {
    console.log(carrito);
    if (info) {
      setInfo(false);
    } else {
      setValues({
        fecha: fecha,
        carrito: carrito,
        descripcion: descripcion,
        idUser: idUser,
        idCarrito: idCarrito,
      });
      setTotal(total);

      setInfo(true);
    }
  };
  useEffect(() => {
    if (!user) {
      const getProductsFromFirebase = [];
      const subscriber = async () => {
        //const carritoReference = collection(db, "historial");
        // console.log(user.id);
        const querySnapshot = await getDocs(collection(db, "historial"));
        // const snapshot = await getDocs(
        //   query(
        //     carritoReference,
        //     where("idUser", "==", "7oV1loHahEXj0UburMIyjME02Lv2")
        //   )
        // );

        querySnapshot.forEach((doc) => {
          getProductsFromFirebase.push({
            ...doc.data(),
            id: doc.id,
          });
          //console.log(`${doc.id} => ${doc.data()}`);
        });

        console.log(getProductsFromFirebase);
        setProductos(getProductsFromFirebase);
      };

      // return cleanup function
      return () => subscriber();
    }
  }, [user]);
  return (
    <div className={styles.container}>
      {user && productos.length > 0 && !info ? (
        <>
          <h1>Historial de Compras</h1>
          {productos.map(
            (product) =>
              user.id === product.idUser && (
                <HistorialCarrito
                  total={product.total}
                  fecha={product.fecha}
                  idCarrito={product.id}
                  idUser={product.idUser}
                  carrito={product.carrito}
                  click={handleClose}
                />
              )
          )}
        </>
      ) : (
        <DetalleFactura
          total={total}
          fecha={values.fecha}
          idCarrito={values.idCarrito}
          idUser={values.idUser}
          carrito={values.carrito}
          click={handleClose}
        />
      )}
    </div>
  );
};

export default Historial;
