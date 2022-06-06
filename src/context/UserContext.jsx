import { useState, useEffect, createContext } from "react";
import { db, auth } from "../utils/firebaseConfig";
import { getFirstElementArrayCollection } from "../utils/parser";
import { doc, getDocs, collection, where, query } from "firebase/firestore";
import { SouthWestTwoTone } from "@mui/icons-material";
export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const agregarACarrito = (idProducto, cantidad, precio, idComercio) => {
    if (carrito.findIndex((i) => i.id === idProducto) === -1) {
      if (carrito.length >= 1) {
        if (carrito[0].idComercio !== idComercio) {
          setCarrito([]);
        }
      }
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

  const modificarCantidadCarrito = (
    type,
    IdProducto,
    cantidad,
    precio,
    idComercio
  ) => {
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
  };

  const createUser = async (user, uid) => {
    await db.collection("users").doc(uid).set(user);
  };

  const getUserByEmail = async (email) => {
    const usersReference = collection(db, "users");
    const snapshot = await getDocs(
      query(usersReference, where("email", "==", email))
    );

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);
        console.log(profile);
        if (!profile) {
          const newProfile = {
            name: loggedUser.displayName,
            email: loggedUser.email,
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
