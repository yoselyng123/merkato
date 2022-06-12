import React, { useState, useRef, useEffect } from "react";
import styles from "./modifyProducto.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import firebaseExports from "../../utils/firebaseConfig";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

function ModifyProducto({ info_producto, click, setProductos, categorias }) {

  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(0.1);
  const categoriaRef = useRef(null);
  const stockRef = useRef(1);

  const modifytoFirebase = async () => {

    const imageURLList = [];
    imageList.forEach(image => {
      imageURLList.push(image.value);
    })

    await updateDoc(doc(firebaseExports.db, "producto", info_producto.id), {
      id_categoria: categoriaRef.current.value,
      descripcion: descripcionRef.current.value,
      nombre: nombreRef.current.value,
      precio_unitario: Number(precioRef.current.value),
      stock: Number(stockRef.current.value),
      foto_producto: imageURLList,
      pasillo: 0 //HAY QUE ESPECIFICAR EL PASILLO
    });

    console.log("Product modified with ID: ", info_producto.id);
    click()
 
    const ProductosFromFirebase = [];

    const querySnapshot = await getDocs(
      query(
        collection(firebaseExports.db, "producto"),
        where("id_comercio", "==", info_producto.id_comercio)
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

  useEffect(() => {
    const newImageInputList = [];
    if (info_producto.foto_producto) {
      info_producto.foto_producto.forEach(image => {
        newImageInputList.push({value: image});
      })
    }
    setImageList(newImageInputList);
  }, [info_producto.foto_producto]);


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
    <div className={styles.infocontent}>

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
        <input type="text" ref={nombreRef} defaultValue={info_producto.nombre} id="nombreProducto" name="nombreProducto" required />

        <label htmlFor="categoriaProducto">Category: </label>
        <div className={styles.selectMenu}>
          <select defaultValue={info_producto.id_categoria} type="text" ref={categoriaRef} className={styles.selectOption} id="categoriaProducto" name="categoriaProducto" >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id} className={styles.categoryOption}>{categoria.nombre}</option>
            ))}
          </select>
        </div>

        <label htmlFor="stockProducto">Stock: </label>
        <input type="number" defaultValue={info_producto.stock} min={1} ref={stockRef} id="stockProducto" name="stockProducto" required />
        
        <label htmlFor="precioProducto">Price $:</label>
        <input type="number" defaultValue={info_producto.precio_unitario} min={0.1} step={0.1} ref={precioRef} id="precioProducto" name="precioProducto" required />
        
        <label htmlFor="descripcionProducto">Description: </label>
        <textarea defaultValue={info_producto.descripcion} ref={descripcionRef} id="descripcionProducto" name="descripcionProducto" required />

        <div className={styles.inputButtons}>
          <button onClick={modifytoFirebase} className={styles.btnModifyProd}>Modify Product</button>
        </div>
      </div>

      <div className={styles.exitbutton} onClick={() => click()}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </SvgIcon>
      </div>

    
    </div>

  );
}

export default ModifyProducto;
