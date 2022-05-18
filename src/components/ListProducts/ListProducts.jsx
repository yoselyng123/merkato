import React, { useState, useEffect, useContext } from "react";
import Product from "../Product/Product";
import styles from "./listProducts.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

function ListProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { carrito, setCarrito } = useContext(UserContext);

  useEffect(() => {
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    const getProductsFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(
        collection(firebaseExports.db, "producto")
      );
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);

        getProductsFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      console.log(getProductsFromFirebase);
      setProducts(getProductsFromFirebase);
      setLoading(false);
    };

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependency array means useEffect will only run once;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.listProducts}>
      <p className={styles.title}>All Products</p>

      <div className={styles.productsContainer}>
        {products.length > 0 ? (
          products.map((product) => <Product key={product.id} data={product} />)
        ) : (
          <h1>No products found</h1>
        )}
      </div>
    </div>
  );
}

export default ListProducts;
