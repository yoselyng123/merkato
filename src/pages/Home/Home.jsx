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
  setCategorias
}) {
  useEffect(() => {
    getProductosFromFirebase(idComercio);
    getCategoriasFromFirebase();
  }, []);

  const getProductosFromFirebase = async (idComercio) => {
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(collection(firebaseExports.db, "producto"), where("id_comercio", "==", idComercio))
    );
    querySnapshot.forEach((doc) => {
      ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    setProductos(ProductosFromFirebase);

    console.log(ProductosFromFirebase);
  };

  const getCategoriasFromFirebase = async () => {
    const CategoriasFromFirebase = [];

    const querySnapshot = await getDocs(
      collection(firebaseExports.db, "categoria")
    );
    querySnapshot.forEach((doc) => {
      CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    setCategorias(CategoriasFromFirebase);

    console.log(CategoriasFromFirebase);
  };

  return (
    <div className={styles.home}>
      <CurrentDeals />

      <Categories categorias={categorias} />

      <ListProducts products={productos} idComercio={idComercio} />
    </div>
  );
}

export default Home;
