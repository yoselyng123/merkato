import React, { useState, useEffect, useContext } from "react";
import styles from "./navBar.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import Logo from "../Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Login from "../Login/Login";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import firebaseExports from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const auth = firebaseExports.auth;

function NavBar() {
  const [side, setSide] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSide({ ...side, [anchor]: open });
  };

  const location = useLocation().pathname;

  const { carrito, user, setCarrito, setRol } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleHistorial = () => {
    handleCloseMenu();
    navigate(`/historial`, { replace: true });
  };

  const handleNavigateOption = (option) => {
    if (option === "Comercios") {
      navigate(`/`, { replace: true });
    }
    if (option === "Historial") {
      navigate(`/historial`, { replace: true });
    }
    if (option === "Favoritos") {
      navigate(`/favorites`, { replace: true });
    }
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.setItem("carrito", "[]");
    setCarrito(JSON.parse(localStorage.getItem("carrito")));
    signOut(auth);
    setRol("");
    setClick(false);
  };

  let navigate = useNavigate();

  const [numItems, setNumItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [click, setClick] = useState(false);
  const [isRegistrando, setIsRegistrando] = useState(false);

  useEffect(() => {
    setNumItems(carrito.reduce((a, b) => a + b.quantity, 0));
    setTotalAmount(carrito.reduce((a, b) => a + b.montoTotal, 0).toFixed(2));

    if (window.location.pathname === "/") {
      setSelectedIndex(0);
      setSelected(true);
    } else if (window.location.pathname === "/historial") {
      setSelectedIndex(1);
      setSelected(true);
    } else if (window.location.pathname === "/favorites") {
      setSelectedIndex(2);
      setSelected(true);
    }
  }, [carrito, window.location.pathname]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search !== "") {
      if (window.location.pathname === "/") {
        navigate(`../searchBy/${search}`, { replace: true });
      } else {
        navigate(`../searchBy/${search}`, { replace: true });
      }
    } else {
      navigate("/", { replace: true });
      setSearch("");
    }
  };

  const handleClose = () => {
    setClick(false);
    setRol("");
  };

  const handleLoginClick = () => {
    setClick(!click);
    setIsRegistrando(false);
  };

  const handleSignInClick = () => {
    setClick(!click);
    setIsRegistrando(true);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        padding: "0.8rem",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {!user && (
          <>
            <ListItem disablePadding className={styles.drawerBtn}>
              <ListItemButton onClick={() => handleSignInClick()}>
                <ListItemText
                  disableTypography
                  primary="Sign up"
                  className={styles.textBtn}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLoginClick()}>
                <ListItemIcon>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z" />
                    </svg>
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        {[
          {
            text: "Comercios",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" />
              </svg>
            ),
          },
          {
            text: "Historial",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z" />
              </svg>
            ),
          },
          {
            text: "Favoritos",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
              </svg>
            ),
          },
        ].map((element, index) => (
          <ListItem
            key={index}
            disablePadding
            selected={selectedIndex === index}
          >
            <ListItemButton onClick={() => handleNavigateOption(element.text)}>
              <ListItemIcon>
                <SvgIcon>{element.icon}</SvgIcon>
              </ListItemIcon>
              <ListItemText primary={element.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className={side["left"] ? styles.navBarNoSticky : styles.navbar}>
      {!user && click && (
        <div className={styles.infobackground}>
          <div className={styles.infocontainer}>
            <Login
              click={handleClose}
              isRegistrando={isRegistrando}
              setIsRegistrando={setIsRegistrando}
              setClick={setClick}
            />
          </div>
        </div>
      )}
      {user && user.rol === "" && (
        <div className={styles.infobackground}>
          <div className={styles.infocontainer}>
            <Login
              click={handleClose}
              isRegistrando={isRegistrando}
              setIsRegistrando={setIsRegistrando}
              setClick={setClick}
            />
          </div>
        </div>
      )}

      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>

      <Link to="/carrito" className={styles.cartWrapperResponsive}>
        <div className={styles.cartWrapper2}>
          <SvgIcon sx={{ fontSize: 30 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M13.9 44.45Q12.25 44.45 11.125 43.3Q10 42.15 10 40.55Q10 38.9 11.15 37.775Q12.3 36.65 13.9 36.65Q15.5 36.65 16.65 37.8Q17.8 38.95 17.8 40.55Q17.8 42.2 16.65 43.325Q15.5 44.45 13.9 44.45ZM34.5 44.45Q32.85 44.45 31.725 43.3Q30.6 42.15 30.6 40.55Q30.6 38.9 31.75 37.775Q32.9 36.65 34.5 36.65Q36.1 36.65 37.25 37.8Q38.4 38.95 38.4 40.55Q38.4 42.2 37.25 43.325Q36.1 44.45 34.5 44.45ZM11.65 10.9 17.05 22.05H31.6Q31.6 22.05 31.6 22.05Q31.6 22.05 31.6 22.05L37.7 10.9Q37.7 10.9 37.7 10.9Q37.7 10.9 37.7 10.9ZM9.85 7.25H40.65Q42.25 7.25 42.625 8.25Q43 9.25 42.35 10.4L35.1 23.4Q34.55 24.35 33.575 25.025Q32.6 25.7 31.45 25.7H16L13.5 30.3Q13.5 30.3 13.5 30.3Q13.5 30.3 13.5 30.3H38.45V33.95H13.4Q11.1 33.95 10.125 32.375Q9.15 30.8 10.15 28.9L13.25 23.1L5.65 6.95H1.6V3.3H8ZM17.05 22.05H31.6Q31.6 22.05 31.6 22.05Q31.6 22.05 31.6 22.05Z" />
            </svg>
          </SvgIcon>
          {numItems !== 0 && (
            <div className={styles.numeritoCarrito}>
              <span>{numItems}</span>
            </div>
          )}
        </div>

        <div className={styles.cartInfo}>
          <p className={styles.cartInfoTitle}>Your cart</p>
          <p className={styles.cartInfoNumber}>${totalAmount}</p>
        </div>
      </Link>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="I'm searching for..."
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
          value={search}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
        />
        <SvgIcon
          sx={{ fill: "var(--gray)", fontSize: 20 }}
          onClick={handleSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
        </SvgIcon>
      </div>

      <div className={styles.hamburger} onClick={toggleDrawer("left", true)}>
        <SvgIcon style={{ fill: "var(--lightGreen)", fontSize: "1.6rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        </SvgIcon>
      </div>

      <div>
        <Drawer
          anchor="left"
          open={side["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>

      <div className={styles.rightSection}>
        {user ? (
          <div className={styles.rightSectionOpt}>
            <SvgIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
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
              {/* <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>My account</MenuItem> */}
              <MenuItem onClick={handleHistorial}>Historial</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <SvgIcon onClick={() => navigate(`/favorites`, { replace: true })}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
              </svg>
            </SvgIcon>
          </div>
        ) : (
          <div className={styles.loginBtn} onClick={(e) => handleLoginClick()}>
            <p>Log in</p>
          </div>
        )}

        {location === "/" && !user ? (
          <div
            className={styles.signInBtn}
            onClick={(e) => handleSignInClick()}
          >
            <p>Sign Up</p>
          </div>
        ) : (
          <Link to="/carrito" className={styles.cartWrapper}>
            <div className={styles.cartWrapper2}>
              <SvgIcon sx={{ fontSize: 30 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path d="M13.9 44.45Q12.25 44.45 11.125 43.3Q10 42.15 10 40.55Q10 38.9 11.15 37.775Q12.3 36.65 13.9 36.65Q15.5 36.65 16.65 37.8Q17.8 38.95 17.8 40.55Q17.8 42.2 16.65 43.325Q15.5 44.45 13.9 44.45ZM34.5 44.45Q32.85 44.45 31.725 43.3Q30.6 42.15 30.6 40.55Q30.6 38.9 31.75 37.775Q32.9 36.65 34.5 36.65Q36.1 36.65 37.25 37.8Q38.4 38.95 38.4 40.55Q38.4 42.2 37.25 43.325Q36.1 44.45 34.5 44.45ZM11.65 10.9 17.05 22.05H31.6Q31.6 22.05 31.6 22.05Q31.6 22.05 31.6 22.05L37.7 10.9Q37.7 10.9 37.7 10.9Q37.7 10.9 37.7 10.9ZM9.85 7.25H40.65Q42.25 7.25 42.625 8.25Q43 9.25 42.35 10.4L35.1 23.4Q34.55 24.35 33.575 25.025Q32.6 25.7 31.45 25.7H16L13.5 30.3Q13.5 30.3 13.5 30.3Q13.5 30.3 13.5 30.3H38.45V33.95H13.4Q11.1 33.95 10.125 32.375Q9.15 30.8 10.15 28.9L13.25 23.1L5.65 6.95H1.6V3.3H8ZM17.05 22.05H31.6Q31.6 22.05 31.6 22.05Q31.6 22.05 31.6 22.05Z" />
                </svg>
              </SvgIcon>
              {numItems !== 0 && (
                <div className={styles.numeritoCarrito}>
                  <span>{numItems}</span>
                </div>
              )}
            </div>

            <div className={styles.cartInfo}>
              <p className={styles.cartInfoTitle}>Your cart</p>
              <p className={styles.cartInfoNumber}>${totalAmount}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
