import React, { useState } from "react";
import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Category({ categorias, pasillo, idcomercio }) {
  let navigate = useNavigate();

  const handlePasilloClick = (id) => {
    navigate(`../searchBy/${idcomercio}/pasillos/${id}`, { replace: true });
  };

  const handleCategoryClick = (id, nombre) => {
    navigate(`../searchBy/${idcomercio}/categories/${id}/${nombre}`, {
      replace: true,
    });
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.category}>
      <div
        className={styles.pasillo}
        onClick={() => handlePasilloClick(pasillo.id)}
      >
        <div className={styles.text}>
          <p>Pasillo {parseInt(pasillo.numero) + 1}</p>
        </div>
      </div>

      <div className={styles.dropdowncategorias}>
        <p>Ver categorias</p>
        <SvgIcon
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
          </svg>
        </SvgIcon>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {categorias.map(
            (categoria) =>
              categoria.pasillo === pasillo.id && (
                <MenuItem
                  key={categoria.id}
                  onClick={() =>
                    handleCategoryClick(categoria.id, categoria.nombre)
                  }
                >
                  {categoria.nombre}
                </MenuItem>
              )
          )}
        </Menu>
      </div>
    </div>
  );
}

export default Category;
