import React from "react";
import styles from "./addfavorites.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import firebaseExports from "../../utils/firebaseConfig";
import {
  doc,
  deleteDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

function AddFavorites({ data, eliminarProductoFavorito }) {
  const { agregarACarritoFavorito, user, eliminarProductoCarritoFavorito } =
    useContext(UserContext);
  const handleClick = async (productdata) => {
    //haces tu peo de agregar el beta a favoritos aca

    if (user.carritoFavorito.findIndex((i) => i.id === data.id) === -1) {
      agregarACarritoFavorito(data.id, data.id_comercio);
      alert("Producto Agregado a favoritos");
    } else {
      eliminarProductoFavorito(data.id);
      eliminarProductoCarritoFavorito(data.id);
      alert("Producto Eliminado de favoritos");
    }
  };

  return (
    <div className={styles.favoriteContainer}>
      {user.carritoFavorito.findIndex((i) => i.id === data.id) === -1 ? (
        <div
          className={styles.favoriteProductContainer}
          onClick={() => handleClick(data)}
        >
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
            </svg>
          </SvgIcon>
          <p className={styles.favoriteText}>Add to Favorites</p>
        </div>
      ) : (
        <div
          className={styles.favoriteActiveProductContainer}
          onClick={() => handleClick(data)}
        >
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
            </svg>
          </SvgIcon>
          <p className={styles.favoriteActiveText}>Delete from Favorites</p>
        </div>
      )}
    </div>
  );
}

export default AddFavorites;
