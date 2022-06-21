import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./viewByCategory.module.css";
import { useNavigate } from "react-router-dom";

import firebaseExports from "../../utils/firebaseConfig";
import {
  query,
  where,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import ListProducts from "../../components/ListProducts/ListProducts";

function ViewByCategory() {
  let navigate = useNavigate();

  const [productByCategory, setProductByCategory] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);

  let { category, namecategory, idcomercio, pasillo } = useParams();
  const [nombreComercio, setNombreComercio] = useState(null);
  const [fotoComercio, setFotoComercio] = useState(null);

  useEffect(() => {
    const subscriber = async () => {
      const categoriesIdsToShow = [];
      const categoriesNamesToShow = [];
      const CategoriasFromFirebase = [];

      if (pasillo) {
        await getDocs(collection(firebaseExports.db, "categoria")).then(
          (querySnapshot2) => {
            querySnapshot2.forEach((doc) => {
              CategoriasFromFirebase.push({ ...doc.data(), id: doc.id });
            });
            console.log(CategoriasFromFirebase);
            CategoriasFromFirebase.forEach((element) => {
              if (element.pasillo === pasillo) {
                categoriesIdsToShow.push(element.id);
                categoriesNamesToShow.push(element.nombre);
              }
            });
            console.log(categoriesIdsToShow);
            console.log(categoriesNamesToShow);
            setCategoriesIds(categoriesIdsToShow);
            setCategoriesNames(categoriesNamesToShow);
          }
        );

        const ProductosFromFirebase = [];

        categoriesIdsToShow.length > 0 &&
          (await getDocs(
            query(
              collection(firebaseExports.db, "producto"),
              where("id_comercio", "==", idcomercio),
              where("id_categoria", "in", categoriesIdsToShow)
            )
          ).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
            });
            setProductByCategory(ProductosFromFirebase);
            console.log("productos", ProductosFromFirebase);
          }));
      } else if (category) {
        const ProductosFromFirebase = [];

        await getDocs(
          query(
            collection(firebaseExports.db, "producto"),
            where("id_categoria", "==", category)
          )
        ).then((querySnapshot2) => {
          querySnapshot2.forEach((doc) => {
            ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
          });
          console.log(ProductosFromFirebase);
          setProductByCategory(ProductosFromFirebase);
          console.log("productos", ProductosFromFirebase);
        });
      }

      await getDoc(doc(firebaseExports.db, "comercio", idcomercio)).then(
        (doc) => {
          const dataComercio = doc.data();
          setNombreComercio(dataComercio.nombre);
          setFotoComercio(dataComercio.foto);
        }
      );
    };
    subscriber();
  }, [idcomercio, pasillo, category]);

  const handleNavigation = () => {
    navigate(`../${nombreComercio}/${idcomercio}/shop`, { replace: true });
  };

  return (
    <div className={styles.viewByCategoryContainer}>
      <div className={styles.comercio} onClick={handleNavigation}>
        <img
          className={styles.comercio_foto}
          src={fotoComercio}
          alt="foto comercio"
        />
        <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
      </div>

      {pasillo && (
        <div className={styles.viewByCategory}>
          {categoriesIds.length > 0 &&
            categoriesIds.map((id, index) => {
              return (
                <ListProducts
                  key={index}
                  title={categoriesNames[index]}
                  products={productByCategory.filter(
                    (item) => item.id_categoria === id
                  )}
                  idcomercio={idcomercio}
                />
              );
            })}
        </div>
      )}

      {category && (
        <div className={styles.viewByCategory}>
          <ListProducts
            title={namecategory}
            products={productByCategory}
            idcomercio={idcomercio}
          />
        </div>
      )}
    </div>
  );
}

export default ViewByCategory;
