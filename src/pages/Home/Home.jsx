import React, { useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";

function Home({ setProductos, productos, idComercio, categorias }) {
  useEffect(() => {
    const getProductosFromFirebase = async (idComercio) => {
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

      console.log(ProductosFromFirebase);
    };

    getProductosFromFirebase(idComercio);
  }, [productos, idComercio, setProductos]);

  return (
    <div className={styles.home}>
      <Categories categorias={categorias} />
      <CurrentDeals />
      <ListProducts products={productos} idComercio={idComercio} />
    </div>
  );
}

export default Home;
