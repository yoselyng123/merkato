import Product from "../Product/Product";
import styles from "./listProductsPasillo.module.css";
import NoMatch from "../NoMatch/NoMatch";

function ListProductsPasillo({
  products,
  setProductos,
  title,
  idComercio,
  categorias,
}) {
  const eliminarProductoFavorito = (id) => {
    console.log("Producto Eliminado de Favoritos");
  };
  return (
    <div className={styles.listProducts}>
      {products.length > 0 ? (
        <div>
          <div className={styles.topSec}>
            {title ? (
              <p className={styles.title}>{title}</p>
            ) : (
              <p className={styles.title}>All Products</p>
            )}
          </div>
          <div className={styles.productsContainer}>
            {products.map((product) => (
              <Product
                key={product.id}
                data={product}
                idComercio={idComercio}
                setProductos={setProductos}
                categorias={categorias}
                eliminarProductoFavorito={eliminarProductoFavorito}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoMatch />
      )}
    </div>
  );
}

export default ListProductsPasillo;
