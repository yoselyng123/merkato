import { useEffect, useState } from "react";
import styles from "./searchAll.module.css";
import { useParams } from "react-router-dom";
import StoreProducts from "../../components/StoreProducts/StoreProducts";
import ListProducts from "../../components/ListProducts/ListProducts";

function SearchAll({ products, comercios }) {
  const [productSearch, setProductSearch] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);

  let { search } = useParams();

  useEffect(() => {
    /* const filtrarByName = (terminoBusqueda) => {
      var resultadosBusqueda = products.filter((product) => {
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
      setProductSearch(resultadosBusqueda);
    };
    filtrarByName(search); */
  }, [search, products]);

  return (
    <div className={styles.searchAll}>
      <p>Resultados para "{search}"</p>
      <StoreProducts />
    </div>
  );
}

export default SearchAll;
