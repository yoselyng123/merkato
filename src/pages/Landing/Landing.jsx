import React from "react";
import styles from "./landing.module.css";

import SvgIcon from "@mui/material/SvgIcon";

import SeccionUno from "./SeccionUno";
import SeccionDos from "./SeccionDos";

function Landing() {
  return (
    <div className={styles.landing}>
      <SeccionUno />
      <SeccionDos />
    </div>
  );
}

export default Landing;
