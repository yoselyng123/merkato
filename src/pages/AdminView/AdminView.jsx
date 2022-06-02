import React, { useEffect } from "react";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./adminview.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";

function AdminView({
  setProductos,
  productos,
  idComercio,
  setCategorias,
}) {
  useEffect(() => {
    const ProductosFromFirebase = [];

    const subscriber = async () => {
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

      console.log(ProductosFromFirebase);

      const CategoriasFromFirebase = [];

      const querySnapshot2 = await getDocs(
        collection(firebaseExports.db, "categoria")
      );
      querySnapshot2.forEach((doc) => {
        CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setCategorias(CategoriasFromFirebase);

      console.log(CategoriasFromFirebase);
    };
    return () => subscriber();
  }, [idComercio, setCategorias, setProductos]);


  return (
    <div className={styles.adminview}>
      <ListProducts products={productos} idComercio={idComercio} />
    </div>
  );
}

export default AdminView;
