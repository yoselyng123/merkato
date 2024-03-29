import React from "react";
import styles from "./MerkaterPage.module.css";
import MerkaterCarrito from "../../components/MerkaterCarrito/MerkaterCarrito";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import DetalleFactura from "../../components/DetalleFactura/DetalleFactura";

const MerkaterPage = () => {
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

  const handleAceptar = async (idUser, idCarrito) => {
    await updateDoc(doc(db, "historial", idCarrito), {
      idMerkater: idUser,
      estado: "en progreso",
    });

    setInfo(false);

    const getCarritosFromFirebase = [];
    /* Se hace un snapshot de los docs en la coleccion Historial */
    const querySnapshot = await getDocs(collection(db, "historial"));
    /* Se hace Push al array de productos de cada doc en Historial */
    querySnapshot.forEach((doc) => {
      getCarritosFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setProductos(getCarritosFromFirebase);
  };
  const handleCancelar = async (idCarrito) => {
    await updateDoc(doc(db, "historial", idCarrito), {
      idMerkater: "",
      estado: "pendiente",
    });

    const getCarritosFromFirebase = [];
    /* Se hace un snapshot de los docs en la coleccion Historial */
    const querySnapshot = await getDocs(collection(db, "historial"));
    /* Se hace Push al array de productos de cada doc en Historial */
    querySnapshot.forEach((doc) => {
      getCarritosFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setProductos(getCarritosFromFirebase);
  };

  const handleCompletar = async (idCarrito) => {
    await updateDoc(doc(db, "historial", idCarrito), {
      estado: "completado",
    });

    setInfo(false);

    const getCarritosFromFirebase = [];
    /* Se hace un snapshot de los docs en la coleccion Historial */
    const querySnapshot = await getDocs(collection(db, "historial"));
    /* Se hace Push al array de productos de cada doc en Historial */
    querySnapshot.forEach((doc) => {
      getCarritosFromFirebase.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setProductos(getCarritosFromFirebase);
  };

  const esPendiente = (numero) => {
    setIsCompletado(numero);
  };

  useEffect(() => {
    const subscriber = async () => {
      /* Se crea array vacio de Productos */
      const getCarritosFromFirebase = [];
      /* Se hace un snapshot de los docs en la coleccion Historial */
      const querySnapshot = await getDocs(collection(db, "historial"));
      /* Se hace Push al array de productos de cada doc en Historial */
      querySnapshot.forEach((doc) => {
        getCarritosFromFirebase.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setProductos(getCarritosFromFirebase);
    };
    subscriber();
  }, [user]);

  return (
    <div className={styles.container}>
      {user && productos.length > 0 ? (
        productos !== -1 ? (
          <>
            {!info ? (
              <>
                <h1>Ordenes</h1>
                <div className={styles.btnBox}>
                  <button
                    className={
                      isCompletado === 0
                        ? `${styles.btnIz} ${styles.btnA}`
                        : `${styles.btnIz}`
                    }
                    onClick={() => esPendiente(0)}
                  >
                    Pendientes
                  </button>
                  <button
                    className={
                      isCompletado === 2
                        ? `${styles.btnMedio} ${styles.btnA}`
                        : `${styles.btnMedio} `
                    }
                    onClick={() => esPendiente(2)}
                  >
                    En Progreso
                  </button>

                  <button
                    className={
                      isCompletado === 1
                        ? `${styles.btnDe} ${styles.btnA}`
                        : `${styles.btnDe} `
                    }
                    onClick={() => esPendiente(1)}
                  >
                    Completadas
                  </button>
                </div>
                {isCompletado === 2
                  ? productos.map(
                      (product) =>
                        user.id === product.idMerkater &&
                        product.estado === "en progreso" && (
                          <MerkaterCarrito
                            total={product.total.toFixed(2)}
                            fecha={product.fecha}
                            idCarrito={product.id}
                            idUser={product.idUser}
                            carrito={product.carrito}
                            click={handleClose}
                            value={product.id}
                            handleCompletar={handleCompletar}
                            handleAceptar={handleAceptar}
                            handleCancelar={handleCancelar}
                            direccion={product.direccion}
                            estado={product.estado}
                            key={product.id}
                          />
                        )
                    )
                  : isCompletado === 0 
                    ? productos.map(
                      (product) =>
                        product.estado === "pendiente" && (
                          <MerkaterCarrito
                            total={product.total.toFixed(2)}
                            fecha={product.fecha}
                            idCarrito={product.id}
                            idUser={product.idUser}
                            carrito={product.carrito}
                            click={handleClose}
                            value={product.id}
                            handleCompletar={handleCompletar}
                            handleAceptar={handleAceptar}
                            handleCancelar={handleCancelar}
                            direccion={product.direccion}
                            estado={product.estado}
                            key={product.id}
                          />
                        )
                    )
                    : productos.map(
                      (product) =>
                        user.id === product.idMerkater &&
                        product.estado === "completado" && (
                          <MerkaterCarrito
                            total={product.total.toFixed(2)}
                            fecha={product.fecha}
                            idCarrito={product.id}
                            idUser={product.idUser}
                            carrito={product.carrito}
                            click={handleClose}
                            value={product.id}
                            handleCompletar={handleCompletar}
                            handleAceptar={handleAceptar}
                            handleCancelar={handleCancelar}
                            direccion={product.direccion}
                            estado={product.estado}
                            key={product.id}
                          />
                        ))}
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
                handleAceptar={handleAceptar}
              />
            )}
          </>
        ) : (
          <div>No hay ordenes disponibles</div>
        )
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
};
export default MerkaterPage;
