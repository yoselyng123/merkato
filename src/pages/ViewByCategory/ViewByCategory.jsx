import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewByCategory.module.css";

import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";
import ListProducts from "../../components/ListProducts/ListProducts";

function ViewByCategory({ categorias }) {
  const [productByCategory, setProductByCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  let { category, idcomercio } = useParams();
  const [nombreComercio, setNombreComercio] = useState(null)
  const [fotoComercio, setFotoComercio] = useState(null)

  useEffect(() => {

    const subscriber = async () => {

      categorias.forEach((element) => {
        if (element.nombre === category) {
          setCategoryId(element.id);
          setCategoryName(element.nombre);
        }
      });
      categoryId && getProductosFromFirebase(idcomercio, categoryId);

      await getDoc(
        doc(firebaseExports.db, "comercio", idcomercio)
      ).then((doc) => {
        const dataComercio = doc.data();
        setNombreComercio(dataComercio.nombre)
        setFotoComercio(dataComercio.foto)
      })
    }
    return () => subscriber();

  }, [categoryId, categorias, idcomercio, category]);

  const getProductosFromFirebase = async (idcomercio, categoryId) => {
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(
        collection(firebaseExports.db, "producto"), 
        where("id_categoria", "==", categoryId),
        where("id_comercio", "==", idcomercio)
        )
    );
    querySnapshot.forEach((doc) => {
      ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    console.log(ProductosFromFirebase);
    setProductByCategory(ProductosFromFirebase);
  };

  return (
    <div className={styles.viewByCategoryContainer}>
      <div className={styles.comercio}>
        <img className={styles.comercio_foto} src={fotoComercio} alt="foto comercio" />
        <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
      </div>
      
      <div className={styles.viewByCategory}>
        <ListProducts
          title={categoryName}
          products={productByCategory}
          idcomercio={idcomercio}
        />
      </div>
    </div>
  );
}

export default ViewByCategory;
