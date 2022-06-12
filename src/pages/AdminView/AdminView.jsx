import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import AgregarProducto from "../../components/AgregarProducto/AgregarProducto";
import styles from "./adminview.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";

function AdminView({
  setProductos,
  productos,
  categorias,
  setCategorias
}) {

  const { idcomercio } = useParams();

  useEffect(() => {
    const ProductosFromFirebase = [];
    const CategoriasFromFirebase = [];

    const subscriber = async () => {
      await getDocs(
        query(
          collection(firebaseExports.db, "producto"),
          where("id_comercio", "==", idcomercio)
        )
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setProductos(ProductosFromFirebase);
      })
      console.log(ProductosFromFirebase);

      await getDocs(
        collection(firebaseExports.db, "categoria")
      ).then((querySnapshot2) => {
        querySnapshot2.forEach((doc) => {
          CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setCategorias(CategoriasFromFirebase);
      })
      console.log(CategoriasFromFirebase);

    };
    return () => subscriber();
  }, [idcomercio, setCategorias, setProductos]);


  return (
    <div className={styles.adminview}>
      <div className={styles.listproducts}>
        <ListProducts products={productos} setProductos={setProductos} idComercio={idcomercio} categorias={categorias} />
      </div>
      <div className={styles.agregarproducto}>
        <AgregarProducto setProductos={setProductos} idComercio={idcomercio} categorias={categorias} />
      </div>
    </div>
  );
}

export default AdminView;
