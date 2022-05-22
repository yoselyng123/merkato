import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./searcher.module.css";
import { useParams } from "react-router-dom";
import { list } from "firebase/storage";

function Searcher({ products, idComercio }) {
  const [listSearch, setListSearch] = useState([]);
  console.log(idComercio);
  let { name } = useParams();

  useEffect(() => {
    filtrar(name);

    // return cleanup function
    /* return () => subscriber(); */
  }, [name]); // empty dependency array means useEffect will only run once;

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = products.filter((product) => {
      if (
        product.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return product;
      }
    });
    setListSearch(resultadosBusqueda);
  };

  return (
    <div className={styles.searcher}>
      <ListProducts products={listSearch} idComercio={idComercio} />
    </div>
  );
}

export default Searcher;
