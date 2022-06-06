import React from "react";
import styles from "./deletebutton.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import firebaseExports from "../../utils/firebaseConfig";
import { doc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore";

function DeleteButton({ data, setProductos, idComercio }) {

  const handleClick = async (productdata) => {
    await deleteDoc(doc(firebaseExports.db, "producto", productdata.id));
    console.log("Product deleted with ID: ", productdata.id);

    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(
        collection(firebaseExports.db, "producto"),
        where("id_comercio", "==", idComercio)
      )
    );
    querySnapshot.forEach((doc) => {
      ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    setProductos(ProductosFromFirebase);
  };

  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteProductContainer} onClick={() => handleClick(data)}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
          </svg>
        </SvgIcon>

        <p className={styles.deleteText}>Delete</p>

      </div>
  </div>
  );
}

export default DeleteButton;
