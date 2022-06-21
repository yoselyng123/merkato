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
  const handleClose = (
    carrito,
    fecha,
    descripcion,
    total,
    idUser,
    idCarrito,
    direccion
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
      setDireccion(direccion);

      setInfo(true);
    }
  };
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
      });
      setTotal(0);

      setIsNombre(false);
    }

    // const userRef = doc(db, "users", user.id);
    // await updateDoc(userRef, {
    //   carrito: [],
    // });
    // localStorage.setItem("carrito", "[]");
    // setCarrito(JSON.parse(localStorage.getItem("carrito")));
    // user.carrito = JSON.parse(localStorage.getItem("carrito"));
    // handleClickHome();
  };
  useEffect(() => {
    const subscriber = async () => {
      const getProductsFromFirebase = [];
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
    subscriber();
  }, [user]);

  /* const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log(values);
    setValues({ ...values, [inputName]: value });
  }; */
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
                <h1>Historial de Compras</h1>
                {productos.map(
                  (product) =>
                    user.id === product.idUser && (
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
