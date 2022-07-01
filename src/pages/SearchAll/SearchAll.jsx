import { useEffect, useState } from "react";
import styles from "./searchAll.module.css";
import { useParams } from "react-router-dom";
import { query, collection, getDocs } from "firebase/firestore";
import firebaseExports from "../../utils/firebaseConfig";
import StoreProducts from "../../components/StoreProducts/StoreProducts";
import Comercio from "../../components/Comercio/Comercio";

function SearchAll({ setIdComercio }) {
  let { search } = useParams();
  const [productosSearch, setProductosSearch] = useState([]);
  const [comerciosSearch, setComerciosSearch] = useState([]);
  const [searchShop, setSearchShop] = useState(null);

  useEffect(() => {
    setProductosSearch([]);
    setComerciosSearch([]);
    setSearchShop(null);

    const subscriber = async () => {
      const getComerciosFromFirebase = [];
      const filteredProducts = [];

      const querySnapshotComercios = await getDocs(
        collection(firebaseExports.db, "comercio")
      );

      const ProductosFromFirebase = [];
      await getDocs(query(collection(firebaseExports.db, "producto"))).then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
          });
        }
      );

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

        if (filteredProducts.findIndex((i) => i.id_comercio === doc.id) > -1) {
          getComerciosFromFirebase.push({
            ...doc.data(),
            id: doc.id,
          });
        }
        if (doc.data().nombre.toLowerCase() === search.toLowerCase()) {
          setSearchShop({
            ...doc.data(),
            id: doc.id,
          });
          console.log("ENTRA!@#");
        }
      });
      setComerciosSearch(getComerciosFromFirebase);
    };

    subscriber();
  }, [search]);

  return (
    <div className={styles.searchAll}>
      <p>Resultados para "{search}"</p>

      {searchShop && (
        <Comercio data={searchShop} setIdComercio={setIdComercio} />
      )}

      {productosSearch.length > 0 && comerciosSearch.length > 0 ? (
        comerciosSearch.map((comercio, index) => (
          <StoreProducts
            comercio={comercio}
            productosSearch={productosSearch}
            key={index}
          />
        ))
      ) : (
        <p className={styles.text}>No se encontraron productos</p>
      )}
    </div>
  );
}

export default SearchAll;
