import styles from "./MerkaterCarrito.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const MerkaterCarrito = ({
  total,
  fecha,
  idCarrito,
  idUser,
  carrito,
  descripcion,
  click,
  handleAceptar,
  handleCancelar,
  handleCompletar,
  /* agregarFavorito, */
  direccion,
  estado,
}) => {
  const Date1 = new Date(fecha);
  const { user } = useContext(UserContext);
  //Actualiza el carrito actual con el carrito que se quiere volver a comprar

  //Opciones para que se muestre la fecha
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={styles.containers}>
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            {/* <Link to="/"> */}
            <h1
              className={styles.nombreProducto}
              onClick={() =>
                click(
                  carrito,
                  Date1.toLocaleDateString("es-Es", options),
                  "Descripcion",
                  total,
                  idUser,
                  idCarrito,
                  direccion,
                  estado
                )
              }
            >
              {idCarrito}
            </h1>
            {/* </Link> */}
            <div className={styles.divDescripcion}>
              <span className={styles.descripcion2}>
                {estado}
              </span>
              <span className={styles.descripcion}>
                {Date1.toLocaleDateString("es-Es", options)}
              </span>
            </div>
          </div>
          <h2 className={styles.precioTotal}>${total}</h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.downRightSide}>
            {estado === "en progreso" ? (
              <div className={styles.divBtn}>
                <button
                  className={styles.buttonAceptar}
                  onClick={() =>
                    handleCancelar(
                      idCarrito
                    )
                  }
                >
                  Cancelar orden
                </button>

                <button
                  className={styles.buttonAceptar}
                  onClick={() =>
                    handleCompletar(
                      idCarrito
                    )
                  }
                >
                  Completar orden
                </button>
              </div>
            ) : estado === "pendiente" && (
              <button
                className={styles.buttonAceptar}
                onClick={() =>
                  handleAceptar(
                    user.id,
                    idCarrito,
                  )
                }
                //   onClick={() => handleDeleteCarrito(id)}
              >
              Aceptar orden
              </button>
            )}

          </div>
          <button
            className={styles.ver}
            onClick={() =>
              click(
                carrito,
                Date1.toLocaleDateString("es-Es", options),
                "Descripcion",
                total,
                idUser,
                idCarrito,
                direccion,
                estado
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

export default MerkaterCarrito;
