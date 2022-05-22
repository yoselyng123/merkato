import React, { useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Home({
  setProductos,
  productos,
  idComercio,
  categorias,
  setCategorias,
}) {
  useEffect(() => {
    getProductosFromFirebase(idComercio);
  }, []);

  const getProductosFromFirebase = async (idComercio) => {
    const CategoriasFromFirebase = [];
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      collection(firebaseExports.db, "comercio", idComercio, "categorias")
    );
    querySnapshot.forEach((doc) => {
      CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    setCategorias(CategoriasFromFirebase);

    for (let i = 0; i < CategoriasFromFirebase.length; i++) {
      const querySnapshot = await getDocs(
        collection(
          firebaseExports.db,
          "comercio",
          idComercio,
          "categorias",
          CategoriasFromFirebase[i].id,
          "productos"
        )
      );
      querySnapshot.forEach((doc) => {
        ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
      });
    }
    console.log(ProductosFromFirebase);

    setProductos(ProductosFromFirebase);
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
