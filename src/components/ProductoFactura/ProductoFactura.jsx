import styles from "./productoFactura.module.css";
// import AddButton from "../AddButton/AddButton";
const ProductoFactura = ({
  img,
  nombreProducto,
  cantidad,
  precio,
  /*   stock,
  id,
  handleDeleteCarrito, */
  idComercio,
}) => {
  console.log(idComercio);
  //const { modificarCantidadCarrito } = useContext(UserContext);

  return (
    <div className={styles.containers}>
      <picture className={styles.boxImg}>
        <img src={img} alt="" className={styles.img} />
      </picture>
      <div className={styles.info}>
        <div className={styles.upInfo}>
          <div className={styles.upLeftSide}>
            <h2 className={styles.nombreProducto}>{nombreProducto}</h2>
            <div className={styles.precioDisponible}>
              <h6 className={styles.precioUnitario}>${precio}</h6>
            </div>
          </div>
          <h2 className={styles.precioTotal}>
            ${(precio * cantidad).toFixed(2)}
          </h2>
        </div>

        <div className={styles.downInfo}>
          <div className={styles.addMore}>
            <span className={styles.addMoreSpan}>{cantidad}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoFactura;
