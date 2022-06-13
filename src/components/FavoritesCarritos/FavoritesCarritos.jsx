import React from "react";
import styles from "./FavoritesCarritos.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import uniqid from "uniqid";

const FavoritesCarritos = ({
  total,
  fecha,
  nombre,
  idUser,
  carrito,
  idCarrito,
  idFavoritoCarrito,
  click,
  eliminarFavorito,
}) => {
  const Date1 = new Date(fecha);
  const { setCarrito, user, setUser } = useContext(UserContext);
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
  //   const eliminarFavorito = async () => {
  //     // console.log(idFavoritoCarrito);

  //     await deleteDoc(doc(db, "favorites", idFavoritoCarrito));
  //   };

  //   const agregarFavoritoCarrito = async () => {
  //     console.log("ENTRA");
  //     await setDoc(doc(db, "favorites", uniqid()), {
  //       nombre: "Mercado Madre",
  //       carrito: carrito,
  //       total: total,
  //       idUser: user.id,
  //       idCarrito: idCarrito,
  //     });
  //     alert("Su carrito ha sido anadido en favoritos");
  //     // const userRef = doc(db, "users", user.id);
  //     // await updateDoc(userRef, {
  //     //   carrito: [],
  //     // });
  //     // localStorage.setItem("carrito", "[]");
  //     // setCarrito(JSON.parse(localStorage.getItem("carrito")));
  //     // user.carrito = JSON.parse(localStorage.getItem("carrito"));
  //     // handleClickHome();
  //   };

  return (
    <div className={styles.containers}>
      {/* <picture className={styles.boxImg}>
        <img alt="" className={styles.img} />
      </picture> */}
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            {/* <Link to="/"> */}
            <h1
              className={styles.nombreProducto}
              onClick={() =>
                click(carrito, "Descripcion", total, idUser, idCarrito, nombre)
              }
            >
              {nombre}
            </h1>
            {/* </Link> */}
            <div className={styles.divDescripcion}>
              <span className={styles.descripcion}>descripcion</span>
            </div>
          </div>
          <h2 className={styles.precioTotal}>${total}</h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.downRightSide}>
            <button
              className={styles.buttonDelete}
              onClick={() => eliminarFavorito(idFavoritoCarrito)}
            >
              Eliminar de favoritos
            </button>
            {/* <button className={styles.buttonSave}>Save</button> */}
            <button className={styles.comprar} onClick={() => volverComprar()}>
              Volver a Comprar
            </button>
          </div>
          <button
            className={styles.ver}
            onClick={() =>
              click(carrito, "descripcion", total, idUser, idCarrito, nombre)
            }
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCarritos;
