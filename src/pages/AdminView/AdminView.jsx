import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListProducts from "../../components/ListProducts/ListProducts";
import AgregarProducto from "../../components/AgregarProducto/AgregarProducto";
import styles from "./adminview.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";

function AdminView({
  setProductos,
  productos,
  categorias
}) {

  const { idcomercio } = useParams();
  const [nombreComercio, setNombreComercio] = useState(null)
  const [fotoComercio, setFotoComercio] = useState(null)
  
  useEffect(() => {
    const ProductosFromFirebase = [];

    const subscriber = async () => {
      await getDocs(
        query(
          collection(firebaseExports.db, "producto"),
          where("id_comercio", "==", idcomercio)
        )
      ).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
        });
        setProductos(ProductosFromFirebase);
      })
      console.log(ProductosFromFirebase);

      await getDoc(
        doc(firebaseExports.db, "comercio", idcomercio)
      ).then((doc) => {
        const dataComercio = doc.data();
        setNombreComercio(dataComercio.nombre)
        setFotoComercio(dataComercio.foto)
      })


    };
    return () => subscriber();
  }, [idcomercio, setProductos]);


  return (
    <div className={styles.adminviewContainer}>
      <div className={styles.comercio}>
        <img className={styles.comercio_foto} src={fotoComercio} alt="foto comercio" />
        <h2 className={styles.comercio_nombre}>{nombreComercio}</h2>
      </div>

      <div className={styles.adminview}>
        <div className={styles.listproducts}>
          <ListProducts products={productos} setProductos={setProductos} idComercio={idcomercio} categorias={categorias} />
        </div>
        <div className={styles.agregarproducto}>
          <AgregarProducto setProductos={setProductos} idComercio={idcomercio} categorias={categorias} />
        </div>
      </div>
    </div>
  );
}

export default AdminView;
