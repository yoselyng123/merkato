import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewByCategory.module.css";

import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ListProducts from "../../components/ListProducts/ListProducts";

function ViewByCategory({ idComercio, categorias }) {
  const [productByCategory, setProductByCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  let { category } = useParams();

  useEffect(() => {
    categorias.forEach((element) => {
      if (element.name === category) {
        setCategoryId(element.id);
      }
    });
    categoryId && getProductosFromFirebase(idComercio, categoryId);
  }, [categoryId, categorias, idComercio, category]);

  const getProductosFromFirebase = async (idComercio, categoryId) => {
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      collection(
        firebaseExports.db,
        "comercio",
        idComercio,
        "categorias",
        categoryId,
        "productos"
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
      <ListProducts products={productByCategory} />
    </div>
  );
}

export default ViewByCategory;
