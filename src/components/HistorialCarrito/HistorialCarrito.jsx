import styles from "./HistorialCarrito.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const HistorialCarrito = ({
  total,
  fecha,
  idCarrito,
  idUser,
  carrito,
  descripcion,
  click,
  handleFavoritos,
  /* agregarFavorito, */
  direccion,
}) => {
  const Date1 = new Date(fecha);
  const { setCarrito, user } = useContext(UserContext);
  let navigate = useNavigate();
  const volverComprar = async () => {
    const userRef = doc(db, "users", user.id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    user.carrito = JSON.parse(localStorage.getItem("carrito"));
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    await updateDoc(userRef, {
      carrito: JSON.parse(localStorage.getItem("carrito")),
    });
    navigate("/carrito", { replace: true });
  };

  return (
    <div className={styles.containers}>
      {/* <picture className={styles.boxImg}>
        <img alt="" className={styles.img} />
      </picture> */}
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            {/* <Link to="/"> */}
            <h1
              className={styles.nombreProducto}
              onClick={() =>
                click(
                  carrito,
                  Date1.toLocaleDateString(),
                  "Descripcion",
                  total,
                  idUser,
                  idCarrito
                )
              }
            >
              {idCarrito}
            </h1>
            {/* </Link> */}
            <div className={styles.divDescripcion}>
              <span className={styles.descripcion}>descripcion</span>
              <span className={styles.descripcion}>
                {Date1.toLocaleDateString()}
              </span>
            </div>
          </div>
          <h2 className={styles.precioTotal}>${total}</h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.downRightSide}>
            <button
              className={styles.buttonDelete}
              onClick={() =>
                handleFavoritos(
                  fecha,
                  carrito,
                  descripcion,
                  user.id,
                  idCarrito,
                  total
                )
              }
              //   onClick={() => handleDeleteCarrito(id)}
            >
              Agregar a favoritos
            </button>
            {/* <button className={styles.buttonSave}>Save</button> */}
            <button className={styles.comprar} onClick={() => volverComprar()}>
              Volver a Comprar
            </button>
          </div>
          <button
            className={styles.ver}
            onClick={() =>
              click(
                carrito,
                Date1.toLocaleDateString(),
                "Descripcion",
                total,
                idUser,
                idCarrito,
                direccion
              )
            }
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistorialCarrito;
