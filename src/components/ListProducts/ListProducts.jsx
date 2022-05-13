import React,{useState,useEffect} from "react";
import Product from "../Product/Product";
import styles from "./listProducts.module.css";
import firebaseExports from '../../utils/firebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import DetalleProducto from "../DetalleProducto/DetalleProducto";

function ListProducts() {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState('no');
  const [itemInfo, setItemInfo] = useState(
    {
        nombre: '',
        foto_producto: '',
        id: 0,
        descripcion: '',
        precio_unidad: 0,
    }
  );

    const handleCardClick = (product) => {
      setInfo('yes');
      itemInfo.nombre = product.nombre;
      itemInfo.descripcion = product.descripcion;
      itemInfo.id = product.id;
      itemInfo.foto_producto = product.foto_producto;
      itemInfo.precio_unidad = product.precio_unitario;
      setItemInfo(itemInfo);

    }

    const handleInfoClick = (e) => {
        setInfo('no');
    }

  useEffect(() => {
    const getProductsFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(collection(firebaseExports.db, "producto"));
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        getProductsFromFirebase.push({...doc.data(), id: doc.id});
      });
      console.log(getProductsFromFirebase);
      setProducts(getProductsFromFirebase);
      setLoading(false);
    }

    // return cleanup function
    return () => subscriber();

    }, []); // empty dependency array means useEffect will only run once;


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className={styles.listProducts}>
      {info === 'yes' && 
        <div className={styles.infocontainer} onClick={handleInfoClick}>
            <DetalleProducto info_producto={itemInfo}/>
        </div>}
        
      <p className={styles.title}>All Products</p>

      <div className={styles.productsContainer}>

        
        {products.length > 0 ? ( 
          products.map((product) => (
            <div onClick={(e) => handleCardClick(product)}><Product key={product.id} data={product}/></div>))
          ) : ( <h1>No products found</h1> )}
      </div>
    </div>
  );
}

export default ListProducts;
