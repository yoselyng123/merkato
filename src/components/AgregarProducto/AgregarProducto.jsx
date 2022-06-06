import React, { useRef, useState } from "react";
import styles from "./AgregarProducto.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const AgregarProducto = ({ setProductos, idComercio, categorias }) => {

  const [imagen, setImagen] = useState(null);
  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(0);
  const categoriaRef = useRef(null);
  const stockRef = useRef(1);
  const imagenRef = useRef(null);

  const cleanFields = () => {
    nombreRef.current.value = "";
    descripcionRef.current.value = "";
    precioRef.current.value = 0;
    categoriaRef.current.value = "";
    stockRef.current.value = 1;
    imagenRef.current.value = "";
    setImagen(null);
  }

  const addtoFirebase = async () => {

    const addSnapshot = await addDoc(collection(firebaseExports.db, "producto"), {
      id_categoria: categoriaRef.current.value,
      descripcion: descripcionRef.current.value,
      id_comercio: idComercio,
      nombre: nombreRef.current.value,
      precio_unitario: Number(precioRef.current.value),
      stock: Number(stockRef.current.value),
      foto_producto: [imagen],
      pasillo: 0 //HAY QUE ESPECIFICAR EL PASILLO
    });

    console.log("Product added with ID: ", addSnapshot.id);

    cleanFields()

    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(
        collection(firebaseExports.db, "producto"),
        where("id_comercio", "==", idComercio)
      )
    );
    querySnapshot.forEach((doc) => {
      ProductosFromFirebase.push({ ...doc.data(), id: doc.id });
    });
    setProductos(ProductosFromFirebase);

  }

  return (

    <div className={styles.inputsBox}>
      <picture className={styles.boxImg}>
        {imagen ? (<img src={imagen} alt="unavailable" />) : (<h3>Insert a Link</h3>)}
      </picture>
      <label htmlFor="imagenProducto">Image Link: </label>
      <input type="text" ref={imagenRef} onChange={(e) => setImagen(e.target.value)} id="imagenProducto" name="imagenProducto" />

      <label htmlFor="nombreProducto">Name: </label>
      <input type="text" ref={nombreRef} id="nombreProducto" name="nombreProducto" />

      <label htmlFor="categoriaProducto">Category: </label>
      <div className={styles.selectMenu}>
        <select defaultValue="unselected" type="text" ref={categoriaRef} className={styles.selectOption} id="categoriaProducto" name="categoriaProducto" >
          <option key="unselected" value="unselected" disabled className={styles.categoryOption}>Select Option</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id} className={styles.categoryOption}>{categoria.nombre}</option>
          ))}
        </select>
      </div>

      <label htmlFor="stockProducto">Stock: </label>
      <input type="number" defaultValue={1} min={1} ref={stockRef} id="stockProducto" name="stockProducto" />
      
      <label htmlFor="precioProducto">Price $:</label>
      <input type="number" defaultValue={0} min={0.1} ref={precioRef} id="precioProducto" name="precioProducto" />
      
      <label htmlFor="descripcionProducto">Description: </label>
      <input type="text" ref={descripcionRef} id="descripcionProducto" name="descripcionProducto" />

      <div className={styles.inputButtons}>
        <button onClick={addtoFirebase} className={styles.btnAgregarProd}>Add Product</button>
        <button onClick={cleanFields} className={styles.btnLimpiarProd}>Clean Fields</button>
      </div>
    </div>

  );
};

export default AgregarProducto;
