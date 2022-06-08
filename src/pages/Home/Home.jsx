import React, { useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";

function Home({
  setProductos,
  productos,
  idComercio,
  categorias,
  setCategorias,
}) {

  useEffect(() => {
    const ProductosFromFirebase = [];
    const CategoriasFromFirebase = [];

    getDocs(
      query(
        collection(firebaseExports.db, "producto"),
        where("id_comercio", "==", idComercio)
      )
    ).then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setProductos(ProductosFromFirebase);
    })

    getDocs(
      collection(firebaseExports.db, "categoria")
    ).then(querySnapshot2 => {
      querySnapshot2.forEach((doc) => {
        CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setCategorias(CategoriasFromFirebase);
    })

  }, [idComercio, setCategorias, setProductos]);

  return (
    <div className={styles.home}>
      <Categories categorias={categorias} />
      <CurrentDeals />
      <ListProducts products={productos} idComercio={idComercio} />
    </div>
  );
}

export default Home;
