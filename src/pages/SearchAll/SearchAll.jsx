import { useEffect } from "react";
import styles from "./searchAll.module.css";
import { useParams } from "react-router-dom";
import StoreProducts from "../../components/StoreProducts/StoreProducts";

function SearchAll({ products, comercios }) {
  let { search } = useParams();

  useEffect(() => {
    console.log("Search");
  }, []);

  return (
    <div className={styles.searchAll}>
      <p>Resultados para "{search}"</p>
      <StoreProducts />
    </div>
  );
}

export default SearchAll;
