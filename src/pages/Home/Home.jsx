import React, { useState } from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListComercios from "../../components/ListComercios/ListComercios";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Home({
  comercios,
  setProductos,
  productos,
  idComercio,
  setIdComercio,
  categorias,
  setCategorias,
}) {
  const handleClickComercio = (comercio) => {
    setIdComercio(comercio.id);
    getProductosFromFirebase(comercio.id);
  };

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
      {idComercio === null && (
        <ListComercios
          comercios={comercios}
          handleClickComercio={handleClickComercio}
        />
      )}

      {idComercio && <Categories categorias={categorias} />}

      {idComercio && (
        <ListProducts products={productos} idComercio={idComercio} />
      )}
    </div>
  );
}

export default Home;
