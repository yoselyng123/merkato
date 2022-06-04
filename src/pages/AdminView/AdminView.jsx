import React, { useEffect } from "react";
import ListProducts from "../../components/ListProducts/ListProducts";
import AgregarProducto from "../../components/AgregarProducto/AgregarProducto";
import styles from "./adminview.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";

function AdminView({
  setProductos,
  productos,
  idComercio,
  categorias,
  setCategorias,
  userRol
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
      <div className={styles.listproducts}>
        <ListProducts products={productos} setProductos={setProductos} idComercio={idComercio} userRol={userRol} />
      </div>
      <div className={styles.agregarproducto}>
        <AgregarProducto idComercio={idComercio} categorias={categorias} />
      </div>
    </div>
  );
}

export default AdminView;
