import { useState, useEffect, createContext } from "react";
import { db, auth } from "../utils/firebaseConfig";
import { getFirstElementArrayCollection } from "../utils/parser";
import {
  doc,
  getDocs,
  collection,
  where,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [carritoFavorito, setCarritoFavorito] = useState([]);
  const [rol, setRol] = useState("");

  const agregarACarrito = async (idProducto, cantidad, precio, idComercio) => {
    //SIN USUARIO GUARDA EN LOCAL STORAGE
    if (user == null) {
      if (carrito.findIndex((i) => i.id === idProducto) === -1) {
        carrito.push({
          id: idProducto,
          quantity: cantidad + 1,
          montoTotal: precio * (cantidad + 1),
          idComercio: idComercio,
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }
    //CON USUARIO GUARDA EN LA BD DIRECTO Y EN EL CARRITO DEL CONTEXT
    else {
      if (user.carrito.findIndex((i) => i.id === idProducto) === -1) {
        user.carrito.push({
          id: idProducto,
          quantity: cantidad + 1,
          montoTotal: precio * (cantidad + 1),
          idComercio: idComercio,
        });
        localStorage.setItem("carrito", JSON.stringify(user.carrito));
      }
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        carrito: user.carrito,
      });
    }
  };

  const eliminarProductoCarrito = async (IdProducto) => {
    //SIN USUARIO GUARDA EN LOCALSTORAGE
    if (user == null) {
      carrito.splice(
        carrito.findIndex((i) => i.id === IdProducto),
        1
      );
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }
    //CON USUARIO GUARDA EN EL CARRITO DEL CONTEXT Y ACTUALIZA LA BD DIRECTO
    else {
      user.carrito.splice(
        user.carrito.findIndex((i) => i.id === IdProducto),
        1
      );
      localStorage.setItem("carrito", JSON.stringify(user.carrito));
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        carrito: user.carrito,
      });
    }
  };
  //FUNCION PARA MODIFICAR LA CANTIDAD DE PRODUCTOS EN CARRITOS
  const modificarCantidadCarrito = async (
    type,
    IdProducto,
    cantidad,
    precio,
    idComercio
  ) => {
    //SI NO HAY USUARIOS
    if (user === null) {
      const localStorageAux = JSON.parse(localStorage.getItem("carrito"));
      if (type === "-") {
        if (
          localStorageAux[localStorageAux.findIndex((i) => i.id === IdProducto)]
            .quantity -
            1 ===
          0
        ) {
          eliminarProductoCarrito(IdProducto);
        } else {
          carrito[carrito.findIndex((i) => i.id === IdProducto)].quantity =
            carrito[carrito.findIndex((i) => i.id === IdProducto)].quantity - 1;
          carrito[carrito.findIndex((i) => i.id === IdProducto)].montoTotal =
            carrito[carrito.findIndex((i) => i.id === IdProducto)].montoTotal -
            precio;
        }
      } else {
        if (carrito.findIndex((i) => i.id === IdProducto) !== -1) {
          carrito[carrito.findIndex((i) => i.id === IdProducto)].quantity =
            carrito[carrito.findIndex((i) => i.id === IdProducto)].quantity + 1;
          carrito[carrito.findIndex((i) => i.id === IdProducto)].montoTotal =
            carrito[carrito.findIndex((i) => i.id === IdProducto)].montoTotal +
            precio;
        } else {
          agregarACarrito(IdProducto, cantidad, precio, idComercio);
        }
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
      setCarrito(JSON.parse(localStorage.getItem("carrito")));
    }
    //SI HAY USUARIO
    else {
      if (type === "-") {
        if (
          user.carrito[user.carrito.findIndex((i) => i.id === IdProducto)]
            .quantity -
            1 ===
          0
        ) {
          eliminarProductoCarrito(IdProducto);
        } else {
          user.carrito[
            user.carrito.findIndex((i) => i.id === IdProducto)
          ].quantity =
            user.carrito[user.carrito.findIndex((i) => i.id === IdProducto)]
              .quantity - 1;
          user.carrito[
            user.carrito.findIndex((i) => i.id === IdProducto)
          ].montoTotal =
            user.carrito[user.carrito.findIndex((i) => i.id === IdProducto)]
              .montoTotal - precio;
        }
      } else {
        if (user.carrito.findIndex((i) => i.id === IdProducto) !== -1) {
          user.carrito[
            user.carrito.findIndex((i) => i.id === IdProducto)
          ].quantity =
            user.carrito[user.carrito.findIndex((i) => i.id === IdProducto)]
              .quantity + 1;
          user.carrito[
            user.carrito.findIndex((i) => i.id === IdProducto)
          ].montoTotal =
            user.carrito[user.carrito.findIndex((i) => i.id === IdProducto)]
              .montoTotal + precio;
        } else {
          agregarACarrito(IdProducto, cantidad, precio, idComercio);
        }
      }
      //ACTUALIZO EL LOCAL STORAGE Y LUEGO ACTUALIZO EL CARRITO PARA QUE SE ACTUALICE EN TIEMPO REAL
      localStorage.setItem("carrito", JSON.stringify(user.carrito));
      setCarrito(JSON.parse(localStorage.getItem("carrito")));

      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        carrito: user.carrito,
      });
    }
  };
  //CREA LOS USUARIOS EN LA COLECCION
  const createUser = async (user, uid) => {
    await setDoc(doc(db, `users/${uid}`), user);
  };
  //OBTIENE EL USUARIO POR EL EMAIL
  const getUserByEmail = async (email) => {
    const usersReference = collection(db, "users");
    const snapshot = await getDocs(
      query(usersReference, where("email", "==", email))
    );

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  const agregarACarritoFavorito = async (idProducto, idComercio) => {
    //SIN USUARIO GUARDA EN LOCAL STORAGE
    if (user == null) {
      if (carritoFavorito.findIndex((i) => i.id === idProducto) === -1) {
        carritoFavorito.push({
          id: idProducto,

          idComercio: idComercio,
        });
        localStorage.setItem(
          "carritoFavorito",
          JSON.stringify(carritoFavorito)
        );
      }
      localStorage.setItem("carritoFavorito", JSON.stringify(carritoFavorito));
      console.log(
        JSON.parse(localStorage.getItem("carritoFavorito")),
        "#######"
      );
      setCarrito(JSON.parse(localStorage.getItem("carritoFavorito")));
    }
    //CON USUARIO GUARDA EN LA BD DIRECTO Y EN EL CARRITO DEL CONTEXT
    else {
      if (user.carritoFavorito.findIndex((i) => i.id === idProducto) === -1) {
        user.carritoFavorito.push({
          id: idProducto,
          idComercio: idComercio,
        });
        localStorage.setItem(
          "carritoFavorito",
          JSON.stringify(user.carritoFavorito)
        );
      }
      setCarritoFavorito(JSON.parse(localStorage.getItem("carritoFavorito")));
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        carritoFavorito: user.carritoFavorito,
      });
    }
  };

  const eliminarProductoCarritoFavorito = async (IdProducto) => {
    //SIN USUARIO GUARDA EN LOCALSTORAGE
    if (user == null) {
      carritoFavorito.splice(
        carritoFavorito.findIndex((i) => i.id === IdProducto),
        1
      );
      localStorage.setItem("carritoFavorito", JSON.stringify(carritoFavorito));
      console.log(
        JSON.parse(localStorage.getItem("carritoFavorito")),
        "#######"
      );
      setCarritoFavorito(JSON.parse(localStorage.getItem("carritoFavorito")));
    }
    //CON USUARIO GUARDA EN EL CARRITO DEL CONTEXT Y ACTUALIZA LA BD DIRECTO
    else {
      user.carritoFavorito.splice(
        user.carritoFavorito.findIndex((i) => i.id === IdProducto),
        1
      );
      localStorage.setItem(
        "carritoFavorito",
        JSON.stringify(user.carritoFavorito)
      );
      setCarritoFavorito(JSON.parse(localStorage.getItem("carritoFavorito")));
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        carritoFavorito: user.carritoFavorito,
      });
    }
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("carrito"))) {
      localStorage.setItem("carrito", "[]");
    }
    if (!localStorage.getItem("rol")) {
      localStorage.setItem("rol", "");
    }

    //FUNCION QUE VERIFICA SI HAY UN USUARIO LOGGUEADO
    const unlisten = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);
        //CREA LOS USUARIOS DE GOOGLE
        if (!profile) {
          const newProfile = {
            name: loggedUser.displayName,
            email: loggedUser.email,
            carrito: JSON.parse(localStorage.getItem("carrito")),
            rol: localStorage.getItem("rol"),
            carritoFavorito: [],
            direcciones: [],
            appliedPromos: [],
          };
          await createUser(newProfile, loggedUser.uid);
          setUser({ ...newProfile, id: loggedUser.uid });
          localStorage.setItem("rol", "");
        } else {
          //ACTUALIZA EL USUARIO EXISTENTE
          if (JSON.parse(localStorage.getItem("carrito")).length === 0) {
            console.log("Entra");
            setCarrito(profile.carrito);
            setUser(profile);
            localStorage.setItem("rol", profile.rol);
          } else {
            const userRef = doc(db, "users", profile.id);

            profile.carrito = JSON.parse(localStorage.getItem("carrito"));
            await updateDoc(userRef, {
              carrito: JSON.parse(localStorage.getItem("carrito")),
            });
            setUser(profile);
            setCarrito(profile.carrito);
            setCarritoFavorito(profile.carritoFavorito);
            localStorage.setItem("rol", profile.rol);
          }
        }
        console.log("Logged user: ", loggedUser.displayName, loggedUser.uid, localStorage.getItem("rol"));
      } else {
        setUser(null);
        console.log("No user logged");
        localStorage.setItem("rol", "");
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        createUser,
        getUserByEmail,
        carrito,
        setCarrito,
        agregarACarrito,
        eliminarProductoCarrito,
        modificarCantidadCarrito,
        rol,
        setRol,
        agregarACarritoFavorito,
        setCarritoFavorito,
        carritoFavorito,
        eliminarProductoCarritoFavorito,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
