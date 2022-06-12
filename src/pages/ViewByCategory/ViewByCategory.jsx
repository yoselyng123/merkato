import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewByCategory.module.css";

import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";
import ListProducts from "../../components/ListProducts/ListProducts";

function ViewByCategory() {
  const [categorias, setCategorias] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);

  let { category, idcomercio, pasillo } = useParams();
  const [nombreComercio, setNombreComercio] = useState(null)
  const [fotoComercio, setFotoComercio] = useState(null)

  useEffect(() => {

    const subscriber = async () => {
      const categoriesIdsToShow = []
      const categoriesNamesToShow = []
      const CategoriasFromFirebase = []

      await getDocs(
        collection(firebaseExports.db, "categoria")
      ).then((querySnapshot2) => {
        querySnapshot2.forEach((doc) => {
          CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setCategorias(CategoriasFromFirebase);
        console.log(CategoriasFromFirebase);
        CategoriasFromFirebase.forEach((element) => {
          if (element.pasillo === pasillo) {
            categoriesIdsToShow.push(element.id)
            categoriesNamesToShow.push(element.nombre)
          }
        });
        console.log(categoriesIdsToShow)
        console.log(categoriesNamesToShow)
        setCategoriesIds(categoriesIdsToShow)
        setCategoriesNames(categoriesNamesToShow)
      })

      const ProductosFromFirebase = [];

      categoriesIdsToShow.length > 0 && await getDocs(
        query(
          collection(firebaseExports.db, "producto"),
          where("id_comercio", "==", idcomercio),
          where("id_categoria", "in", categoriesIdsToShow)
        )
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setProductByCategory(ProductosFromFirebase)
        console.log("productos", ProductosFromFirebase)
      })

      await getDoc(
        doc(firebaseExports.db, "comercio", idcomercio)
      ).then((doc) => {
        const dataComercio = doc.data();
        setNombreComercio(dataComercio.nombre)
        setFotoComercio(dataComercio.foto)
      })
    }
    return () => subscriber();
  
  }, [idcomercio, pasillo]);

  return (
    <div className={styles.viewByCategoryContainer}>
      <div className={styles.comercio}>
        <img className={styles.comercio_foto} src={fotoComercio} alt="foto comercio" />
        <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
      </div>

      {pasillo && 
        <div className={styles.viewByCategory}>
        {categoriesIds.length > 0 && (
          categoriesIds.map((id, index) => {
            return (
              <ListProducts key={index} title={categoriesNames[index]} products={productByCategory.filter(item => item.id_categoria === id)} idcomercio={idcomercio} />
            )
          })
        )}
        </div>
      }

    </div>
  );
}

export default ViewByCategory;
