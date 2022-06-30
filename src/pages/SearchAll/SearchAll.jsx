import { useEffect, useState } from "react";
import styles from "./searchAll.module.css";
import { useParams } from "react-router-dom";
import { query, collection, getDocs } from "firebase/firestore";
import firebaseExports from "../../utils/firebaseConfig";
import StoreProducts from "../../components/StoreProducts/StoreProducts";
import ListProducts from "../../components/ListProducts/ListProducts";

function SearchAll({ }) {
  let { search } = useParams();
  const [productosSearch, setProductosSearch] = useState([]);
  const [comerciosSearch, setComerciosSearch] = useState([]);

  useEffect(() => {
    const subscriber = async () => {

      const getComerciosFromFirebase = [];
      const filteredProducts = [];

      const querySnapshotComercios = await getDocs(
        collection(firebaseExports.db, "comercio")
      );

      const ProductosFromFirebase = [];
      await getDocs(
        query(
          collection(firebaseExports.db, "producto"),
        )
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
        });

      });

      const filtrarByName = (terminoBusqueda) => {
        var resultadosBusqueda = ProductosFromFirebase.filter((product) => {
          if (
            product.nombre
              .toString()
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase())
          ) {
            return product;
          } else {
            return null;
          }
        });
        resultadosBusqueda.forEach((product) => {
          filteredProducts.push(product);
        });
        setProductosSearch(resultadosBusqueda);
      };
      filtrarByName(search);



    querySnapshotComercios.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);

      if (
        filteredProducts.findIndex((i) => i.id_comercio === doc.id) >
        -1
      ) {
        getComerciosFromFirebase.push({
          ...doc.data(),
          id: doc.id,
        });
      }
    });
    setComerciosSearch(getComerciosFromFirebase);

  }

    subscriber();
  }, [search]);

  return (
    <div className={styles.searchAll}>
      <p>Resultados para "{search}"</p>

      {productosSearch && <StoreProducts comerciosSearch={comerciosSearch} productosSearch={productosSearch}/>}

    </div>
  );
}

export default SearchAll;
