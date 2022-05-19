import { useState, useEffect, createContext } from "react";
import { db, auth } from "../utils/firebaseConfig";
import { getFirstElementArrayCollection } from "../utils/parser";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const agregarACarrito = (idProducto, cantidad, precio) => {
    if (carrito.findIndex((i) => i.id === idProducto) === -1) {
      carrito.push({
        id: idProducto,
        quantity: cantidad + 1,
        montoTotal: precio * (cantidad + 1),
      });
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
  };

  const eliminarProductoCarrito = (IdProducto) => {
    carrito.splice(
      carrito.findIndex((i) => i.id === IdProducto),
      1
    );
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
  };

  const modificarCantidadCarrito = (type, IdProducto, cantidad, precio) => {
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
        agregarACarrito(IdProducto, cantidad, precio);
      }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem("carrito")), "#######");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
  };

  const createUser = async (user, uid) => {
    await db.collection("users").doc(uid).set(user);
  };

  const getUserByEmail = async (email) => {
    const usersReference = db.collection("users");
    const snapshot = await usersReference.where("email", "==", email).get();

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);

        if (!profile) {
          const newProfile = {
            name: loggedUser.displayName,
            email: loggedUser.email,
            role: "",
            number: "",
            pais: "",
            photo:
              "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
            description: "",
            gender: "",
            birthday: "",
            problemas: [],
            appointments: [],
            incidencias: [],
            pdf: "",
            ratings: [],
          };
          await createUser(newProfile, loggedUser.uid);
          setUser(newProfile);
        } else {
          setUser(profile);
        }
      } else {
        setUser(null);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
