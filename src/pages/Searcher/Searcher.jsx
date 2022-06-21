import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts/ListProducts";
import styles from "./searcher.module.css";
import { useParams } from "react-router-dom";

function Searcher({ products, idComercio, categorias }) {
  const [listSearch, setListSearch] = useState([]);

  let { name } = useParams();

  useEffect(() => {
    if (products || idComercio || categorias) {
      console.log(products, idComercio, categorias);
    }
    const filtrarByName = (terminoBusqueda) => {
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
      setListSearch(resultadosBusqueda);
    };

    const filtrarByCategory = (terminoBusqueda) => {
      var resultadosBusqueda = products.filter((product) => {
        if (product.id_categoria === terminoBusqueda) {
          return product;
        } else {
          return null;
        }
      });
      setListSearch(resultadosBusqueda);
    };

    /* const filtrarByStores = (terminoBusqueda) => {
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
      setListSearch(resultadosBusqueda);

      listSearch.map(() => {

      })
    }; */

    let idCat = "";

    categorias.map((element) => {
      if (
        element.nombre.toString().toLowerCase() ===
        name.toString().toLowerCase()
      ) {
        idCat = element.id.toString();
      }

      return null;
    });

    if (idCat !== "") {
      filtrarByCategory(idCat);
    } else {
      filtrarByName(name);
    }

    // return cleanup function
    /* return () => subscriber(); */
  }, [name, categorias, products, idComercio]); // empty dependency array means useEffect will only run once;

  return (
    <div className={styles.searcher}>
      <ListProducts products={listSearch} idComercio={idComercio} />
    </div>
  );
}

export default Searcher;
