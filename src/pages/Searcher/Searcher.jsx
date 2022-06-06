import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./searcher.module.css";
import { useParams } from "react-router-dom";

function Searcher({ products, idComercio, categorias }) {
  const [listSearch, setListSearch] = useState([]);

  let { name } = useParams();

  useEffect(() => {
    let idCat = "";

    categorias.map((element) => {
      if (
        element.nombre.toString().toLowerCase() ===
        name.toString().toLowerCase()
      ) {
        idCat = element.id.toString();
      }
    });

    if (idCat !== "") {
      filtrarByCategory(idCat);
    } else {
      filtrarByName(name);
    }

    // return cleanup function
    /* return () => subscriber(); */
  }, [name]); // empty dependency array means useEffect will only run once;

  const filtrarByName = (terminoBusqueda) => {
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

  const filtrarByCategory = (terminoBusqueda) => {
    var resultadosBusqueda = products.filter((product) => {
      if (product.id_categoria === terminoBusqueda) {
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
