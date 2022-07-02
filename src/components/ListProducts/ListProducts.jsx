import Product from "../Product/Product";
import styles from "./listProducts.module.css";
import NoMatch from "../NoMatch/NoMatch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { SvgIcon } from "@mui/material";

function ListProducts({
  products,
  setProductos,
  title,
  idComercio,
  categorias,
}) {
  const [sort, setSort] = useState("Precio mas bajo");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /* Filter product Function */
  const handleClickItem = (event) => {
    handleCloseMenu();
    setSort(event.currentTarget.innerText);
    if (event.currentTarget.innerText === "Precio mas bajo")
      products.sort(
        (a, b) => parseFloat(a.precio_unitario) - parseFloat(b.precio_unitario)
      );
    else {
      products.sort(
        (a, b) => parseFloat(b.precio_unitario) - parseFloat(a.precio_unitario)
      );
    }
  };

  const eliminarProductoFavorito = (id) => {
    console.log("Trol");
  };
  return (
    <div className={styles.listProducts}>
      {products.length > 0 ? (
        <div>
          <div className={styles.topSec}>
            {title ? (
              <p className={styles.title}>{title}</p>
            ) : (
              <p className={styles.title}>Todos los productos</p>
            )}
            <div
              className={styles.filterBtn}
              id="demo-customized-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <SvgIcon>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.94 3.44a1.5 1.5 0 012.12 0L12 7.378A1.5 1.5 0 119.879 9.5L8.5 8.121V19a1.5 1.5 0 01-3 0V8.12L4.121 9.5A1.5 1.5 0 112 7.379l3.94-3.94zM19.879 14.5L18.5 15.88V5a1.5 1.5 0 00-3 0v10.879L14.121 14.5A1.5 1.5 0 1012 16.621l3.94 3.94a1.5 1.5 0 002.12 0L22 16.62a1.5 1.5 0 10-2.121-2.12z"></path>
                </svg>
              </SvgIcon>
              <p>Filtrar</p>

              {open ? (
                <SvgIcon style={{ fontSize: "1rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z" />
                  </svg>
                </SvgIcon>
              ) : (
                <SvgIcon style={{ fontSize: "1rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
                  </svg>
                </SvgIcon>
              )}
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
            >
              <MenuItem onClick={handleClickItem}>Precio mas bajo</MenuItem>
              <MenuItem onClick={handleClickItem}>Precio mas alto</MenuItem>
            </Menu>
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

export default ListProducts;
