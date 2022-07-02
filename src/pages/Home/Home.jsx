import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "../../components/Categories/Categories";
import CurrentDeals from "../../components/CurrentDeals/CurrentDeals";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./home.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import {
  query,
  where,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

function Home({ setProductos, productos, categorias, pasillos }) {
  const { idcomercio } = useParams();
  const [nombreComercio, setNombreComercio] = useState(null);
  const [fotoComercio, setFotoComercio] = useState(null);

  useEffect(() => {
    const subscriber = async () => {
      setProductos([]);
      const ProductosFromFirebase = [];
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
        console.log(ProductosFromFirebase);
      });

      await getDoc(doc(firebaseExports.db, "comercio", idcomercio)).then(
        (doc) => {
          const dataComercio = doc.data();
          setNombreComercio(dataComercio.nombre);
          setFotoComercio(dataComercio.foto);
        }
      );
    };

    subscriber();
  }, [setProductos, idcomercio]);

  return (
    <div className={styles.home}>
      <div className={styles.comercio}>
        <img
          className={styles.comercio_foto}
          src={fotoComercio}
          alt="foto comercio"
        />
        <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
      </div>
      <Categories
        categorias={categorias}
        idcomercio={idcomercio}
        pasillos={pasillos}
      />
      <CurrentDeals />
      <ListProducts products={productos} idComercio={idcomercio} />
    </div>
  );
}

export default Home;
