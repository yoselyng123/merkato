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
import ListProductsPasillo from "../../components/ListProductsPasillo/ListProductsPasillo";
import { SvgIcon } from "@mui/material";

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
  const handlePasilloNavigation = (type) => {
    if (type === "next") {
      navigate(`../searchBy/${idcomercio}/pasillos/${parseInt(pasillo) + 1}`, {
        replace: true,
      });
    } else {
      navigate(`../searchBy/${idcomercio}/pasillos/${parseInt(pasillo) - 1}`, {
        replace: true,
      });
    }
  };

  return (
    <div className={styles.viewByCategoryContainer}>
      <div className={styles.topSection}>
        {pasillo !== "0" && (
          <div
            className={styles.previousBtn}
            onClick={() => handlePasilloNavigation("previous")}
          >
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
              </svg>
            </SvgIcon>
            <p>Pasillo anterior</p>
          </div>
        )}

        <div className={styles.comercio} onClick={handleNavigation}>
          <img
            className={styles.comercio_foto}
            src={fotoComercio}
            alt="foto comercio"
          />
          <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
        </div>
        <div
          className={styles.nextBtn}
          onClick={() => handlePasilloNavigation("next")}
        >
          <p>Siguiente pasillo</p>
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z" />
            </svg>
          </SvgIcon>
        </div>
      </div>

      {pasillo && (
        <div className={styles.viewByCategory}>
          {categoriesIds.length > 0 &&
            categoriesIds.map((id, index) => {
              return (
                <ListProductsPasillo
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
          <ListProductsPasillo
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
