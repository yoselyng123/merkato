import React from "react";
import styles from "./Historial.module.css";
import HistorialCarrito from "../HistorialCarrito/HistorialCarrito";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import DetalleFactura from "../DetalleFactura/DetalleFactura";
import AddNameFavorite from "../AddNameFavorite/AddNameFavorite";
import uniqid from "uniqid";
const Historial = () => {
  const [info, setInfo] = useState(false);
  const { user } = useContext(UserContext);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(null);
  const [isCompletado, setIsCompletado] = useState(false);
  const [values, setValues] = useState({
    carrito: "",
    fecha: "",
    descripcion: "",
    idUser: "",
    idCarrito: "",
    nombre: "",
  });
  const [isNombre, setIsNombre] = useState(false);
  const [direccion, setDireccion] = useState("");
  //Abre y cierra la descripcion de cada compra
  const handleClose = (
    carrito,
    fecha,
    descripcion,
    total,
    idUser,
    idCarrito,
    direccion,
    estado
  ) => {
    if (info) {
      setInfo(false);
    } else {
      setValues({
        fecha: fecha,
        carrito: carrito,
        descripcion: descripcion,
        idUser: idUser,
        idCarrito: idCarrito,
        estado: estado,
      });
      setTotal(total);
      setDireccion(direccion);

      setInfo(true);
    }
  };
  //Abre el pop-up de favoritos para agregar el carrito a favoritos
  const handleCloseFavorite = (
    fecha,
    carrito,
    descripcion,
    idUser,
    idCarrito,
    total
  ) => {
    if (isNombre) {
      setIsNombre(false);
    } else {
      setValues({
        nombre: "",
        fecha: fecha,
        carrito: carrito,
        descripcion: descripcion,
        idUser: idUser,
        idCarrito: idCarrito,
      });
      setTotal(total);
      setIsNombre(true);
      console.log(values);
    }
  };
  //Se agrega un carrito a favoritos
  const agregarFavoritoCarrito = async () => {
    console.log("ENTRA");
    if (values.nombre) {
      await setDoc(doc(db, "favorites", uniqid()), {
        nombre: values.nombre,
        carrito: values.carrito,
        total: total,
        idUser: user.id,
        idCarrito: values.idCarrito,
      });
      console.log(values);
      alert("Su carrito ha sido anadido en favoritos");
      setValues({
        nombre: "",
        fecha: "",
        carrito: "",
        descripcion: "",
        idUser: "",
        idCarrito: "",
        estado: "",
      });
      setTotal(0);

      setIsNombre(false);
    }
  };
  const esPendiente = () => {
    if (isCompletado) {
      setIsCompletado(false);
    } else {
      setIsCompletado(true);
    }
  };
  useEffect(() => {
    const subscriber = async () => {
      /* Se crea array vacio de Productos */
      const getProductsFromFirebase = [];
      /* Se hace un snapshot de los docs en la coleccion Historial */
      const querySnapshot = await getDocs(collection(db, "historial"));
      /* Se hace Push al array de productos de cada doc en Historial */
      querySnapshot.forEach((doc) => {
        getProductsFromFirebase.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setProductos(getProductsFromFirebase);
    };
    subscriber();
  }, [user]);

  return (
    <div className={styles.container}>
      {isNombre && (
        <div className={styles.container2}>
          <AddNameFavorite
            handleClose={handleCloseFavorite}
            values={values}
            setValues={setValues}
            value={values.nombre}
            agregarFavoritoCarrito={agregarFavoritoCarrito}
          />
        </div>
      )}

      {user && productos.length > 0 ? (
        productos.findIndex((i) => i.idUser === user.id) !== -1 ? (
          <>
            {!info ? (
              <>
                <h1>Mis Compras</h1>
                <div className={styles.btnBox}>
                  <button
                    className={
                      isCompletado
                        ? `${styles.btnIz}`
                        : `${styles.btnIz} ${styles.btnA}`
                    }
                    onClick={esPendiente}
                  >
                    Pendientes
                  </button>
                  <button
                    className={
                      !isCompletado
                        ? `${styles.btnDe}`
                        : `${styles.btnDe} ${styles.btnA}`
                    }
                    onClick={esPendiente}
                  >
                    Confirmados
                  </button>
                </div>
                {isCompletado
                  ? productos.map(
                      (product) =>
                        user.id === product.idUser &&
                        product.estado === "completado" && (
                          <HistorialCarrito
                            total={product.total.toFixed(2)}
                            fecha={product.fecha}
                            idCarrito={product.id}
                            idUser={product.idUser}
                            carrito={product.carrito}
                            click={handleClose}
                            value={product.id}
                            handleFavoritos={handleCloseFavorite}
                            agregarFavorito={agregarFavoritoCarrito}
                            direccion={product.direccion}
                            estado={product.estado}
                            key={product.id}
                          />
                        )
                    )
                  : productos.map(
                      (product) =>
                        user.id === product.idUser &&
                        product.estado !== "completado" && (
                          <HistorialCarrito
                            total={product.total.toFixed(2)}
                            fecha={product.fecha}
                            idCarrito={product.id}
                            idUser={product.idUser}
                            carrito={product.carrito}
                            click={handleClose}
                            value={product.id}
                            handleFavoritos={handleCloseFavorite}
                            agregarFavorito={agregarFavoritoCarrito}
                            direccion={product.direccion}
                            estado={product.estado}
                            key={product.id}
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
                direccion={direccion}
                estado={values.estado}
              />
            )}
          </>
        ) : (
          <div>No tiene compras realizadas</div>
        )
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
};

export default Historial;
