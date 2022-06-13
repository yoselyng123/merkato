import React, { useRef, useState } from "react";
import styles from "./AgregarProducto.module.css";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const AgregarProducto = ({ setProductos, idComercio, categorias }) => {

  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(0.1);
  const categoriaRef = useRef(null);
  const stockRef = useRef(1);

  const cleanFields = () => {

    nombreRef.current.value = "";
    descripcionRef.current.value = "";
    precioRef.current.value = 0.1;
    categoriaRef.current.value = "unselected";
    stockRef.current.value = 1;
    setImageList(imageInputList);
  }

  const addtoFirebase = async () => {

    const imageURLList = [];
    imageList.forEach(image => {
      imageURLList.push(image.value);
    })

    const addSnapshot = await addDoc(collection(firebaseExports.db, "producto"), {
      id_categoria: categoriaRef.current.value,
      descripcion: descripcionRef.current.value,
      id_comercio: idComercio,
      nombre: nombreRef.current.value,
      precio_unitario: Number(precioRef.current.value),
      stock: Number(stockRef.current.value),
      foto_producto: imageURLList
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

  //AQUI ES PARA LOS INPUTS DE LAS IMAGENES

  const imageInputList = [{
    value: ""
  }]

  const [imageList, setImageList] = useState(imageInputList);

  const addInput = () => {
    setImageList(s => {
      return [
        ...s, 
        {
          value: ""
        }
      ]
    });
  };

  const removeInput = index => {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
  }

  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setImageList(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };


  return (

    <div className={styles.inputsBox}>
      <picture className={styles.boxImg}>
        {imageList[0].value !== "" ? (<img src={imageList[0].value} alt="unavailable" />) : (<h3>Insert a Link</h3>)}
      </picture>
      <label htmlFor="imagenProducto">Image Link: </label>

      {imageList.map((item, index) => (
        <div key={index} className={styles.imageInputs}>
          <div className={styles.imageInput}>
            <input 
              value={item.value}
              id={index}
              type="text"
              onChange={handleChange}

              required 
            />

            {imageList.length !== 1 && <button onClick={() => removeInput(index)} className={styles.button}>-</button>}
          </div>
          <div className={styles.addButton}>
            {imageList.length - 1 === index && <button onClick={addInput} className={styles.button}>+</button>}
          </div>
        </div>
      ))}
      

      

      <label htmlFor="nombreProducto">Name: </label>
      <input type="text" ref={nombreRef} id="nombreProducto" name="nombreProducto" required />

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
      <input type="number" defaultValue={1} min={1} ref={stockRef} id="stockProducto" name="stockProducto" required />
      
      <label htmlFor="precioProducto">Price $:</label>
      <input type="number" defaultValue={0.1} min={0.1} step={0.1} ref={precioRef} id="precioProducto" name="precioProducto" required />
      
      <label htmlFor="descripcionProducto">Description: </label>
      <input type="text" ref={descripcionRef} id="descripcionProducto" name="descripcionProducto" required />

      <div className={styles.inputButtons}>
        <button onClick={addtoFirebase} className={styles.btnAgregarProd}>Add Product</button>
        <button onClick={cleanFields} className={styles.btnLimpiarProd}>Clean Fields</button>
      </div>
    </div>

  );
};

export default AgregarProducto;
