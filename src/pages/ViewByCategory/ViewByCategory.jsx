import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewByCategory.module.css";

import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs } from "firebase/firestore";
import ListProducts from "../../components/ListProducts/ListProducts";

function ViewByCategory({ idComercio, categorias }) {
  const [productByCategory, setProductByCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);

  let { category } = useParams();

  useEffect(() => {
    categorias.forEach((element) => {
      if (element.nombre === category) {
        setCategoryId(element.id);
        setCategoryName(element.nombre);
      }
    });
    categoryId && getProductosFromFirebase(idComercio, categoryId);
  }, [categoryId, categorias, idComercio, category]);

  const getProductosFromFirebase = async (idComercio, categoryId) => {
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(
        collection(firebaseExports.db, "producto"), 
        where("id_categoria", "==", categoryId),
        where("id_comercio", "==", idComercio)
        )
    );
    querySnapshot.forEach((doc) => {
      ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    console.log(ProductosFromFirebase);
    setProductByCategory(ProductosFromFirebase);
  };

  return (
    <div className={styles.viewByCategory}>
      <ListProducts
        title={categoryName}
        products={productByCategory}
        idComercio={idComercio}
      />
    </div>
  );
}

export default ViewByCategory;
