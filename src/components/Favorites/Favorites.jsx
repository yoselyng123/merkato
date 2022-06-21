import React from "react";
import styles from "./Favorites.module.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import FavoritesCarritos from "../FavoritesCarritos/FavoritesCarritos";
import DetalleFavoritoMercado from "../DetalleFavoritoMercado/DetalleFavoritoMercado";
import Product from "../Product/Product";
import toast from "react-hot-toast";
const Favorites = () => {
  const [info, setInfo] = useState(false);
  const [mercados, setMercados] = useState(false);
  const { user, setCarritoFavorito } = useContext(UserContext);
  //Este es Carritos
  const [productos, setProductos] = useState([]);
  //Este es productos
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(null);
  const [values, setValues] = useState({
    carrito: "",
    nombre: "",
    descripcion: "",
    idUser: "",
    idCarrito: "",
  });
  /* const handleClose1 = () => {
    setInfo(true);
  }; */
  //CAMBIA DE CARRITOS FAVORITOS A PRODUCTOS FAVORITOS
  const esMercado = () => {
    if (mercados) {
      setMercados(false);
    } else {
      setMercados(true);
    }
  };
  //SE UTILIZA PARA ABRIR Y CERRAR EL DETALLE DEL CARRITO FAVORITO
  const handleClose = (
    carrito,
    descripcion,
    total,
    idUser,
    idCarrito,
    nombre
  ) => {
    console.log(carrito);
    if (info) {
      setInfo(false);
    } else {
      setValues({
        nombre: nombre,
        carrito: carrito,
        descripcion: descripcion,
        idUser: idUser,
        idCarrito: idCarrito,
      });
      setTotal(total);

      setInfo(true);
    }
  };
  //ELIMINA UN PRODUCTO DE FAVORITOS
  const eliminarProductoFavorito = (id) => {
    const newArray = products.filter((item) => item.id !== id);
    setProducts(newArray);
  };
  //ELIMINA UN CARRITO DE FAVORITO
  const eliminarFavorito = async (id) => {
    // console.log(idFavoritoCarrito);
    console.log("entra");
    const newArray = productos.filter((item) => item.id !== id);
    console.log(id);
    setProductos(newArray);

    await deleteDoc(doc(db, "favorites", id));
    toast.success("Se ha eliminado el carrito de favoritos!");
  };
  useEffect(() => {
    const subscriber = async () => {
      const getProductsFromFirebase = [];
      // console.log(user.id);
      const querySnapshot = await getDocs(collection(db, "favorites"));

      querySnapshot.forEach((doc) => {
        getProductsFromFirebase.push({
          ...doc.data(),
          id: doc.id,
        });
        //console.log(`${doc.id} => ${doc.data()}`);
      });

      console.log(getProductsFromFirebase);

      setProductos(getProductsFromFirebase);
    };

    // return cleanup function
    subscriber();
  }, [user, setCarritoFavorito]);

  useEffect(() => {
    if (user === null) {
      setCarritoFavorito(JSON.parse(localStorage.getItem("carritoFavorito")));
    }
    const getProductsFromFirebase = [];
    const subscriber = async () => {
      const querySnapshot = await getDocs(collection(db, "producto"));
      querySnapshot.forEach((doc) => {
        if (user == null) {
          if (
            JSON.parse(localStorage.getItem("carritoFavorito")).findIndex(
              (i) => i.id === doc.id
            ) > -1
          ) {
          }
        } else {
          if (user.carritoFavorito.findIndex((i) => i.id === doc.id) > -1) {
            getProductsFromFirebase.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        }
      });

      console.log(getProductsFromFirebase);
      setProducts(getProductsFromFirebase);
    };

    // return cleanup function
    subscriber();
  }, [user, setCarritoFavorito]);

  return (
    <div className={mercados ? styles.container : styles.containerProductos}>
      <h1>Favoritos</h1>
      {!info && user && (
        <div className={styles.btnBox}>
          <button
            className={
              mercados ? `${styles.btnIz}` : `${styles.btnIz} ${styles.btnA}`
            }
            onClick={esMercado}
          >
            Productos Favoritos
          </button>
          <button
            className={
              !mercados ? `${styles.btnDe}` : `${styles.btnDe} ${styles.btnA}`
            }
            onClick={esMercado}
          >
            Carritos Favoritos
          </button>
        </div>
      )}

      <>
        {user ? (
          mercados ? (
            productos.length > 0 &&
            !info &&
            productos.findIndex((i) => i.idUser === user.id) !== -1 ? (
              <>
                {productos.map(
                  (product) =>
                    user.id === product.idUser && (
                      <FavoritesCarritos
                        total={product.total}
                        fecha="No tiene"
                        nombre={product.nombre}
                        idUser={product.idUser}
                        carrito={product.carrito}
                        idCarrito={product.idCarrito}
                        idFavoritoCarrito={product.id}
                        click={handleClose}
                        eliminarFavorito={eliminarFavorito}
                        key={product.id}
                      />
                    )
                )}
              </>
            ) : values.nombre !== "" ? (
              <DetalleFavoritoMercado
                total={total}
                nombre={values.nombre}
                idUser={values.idUser}
                carrito={values.carrito}
                idCarrito={values.idCarrito}
                click={handleClose}
              />
            ) : (
              <div>No tiene ningun carrito en favoritos</div>
            )
          ) : products.length > 0 ? (
            <div className={styles.containerProductos2}>
              {products.map((product) => (
                <Product
                  setProductos={setProductos}
                  data={product}
                  idComercio={product.id_comercio}
                  categorias={product.id_categoria}
                  eliminarProductoFavorito={eliminarProductoFavorito}
                  key={product.id}
                />
              ))}
            </div>
          ) : (
            <div>No tiene productos en favoritos</div>
          )
        ) : (
          <div>Cargando</div>
        )}
      </>
    </div>
  );
};

export default Favorites;
