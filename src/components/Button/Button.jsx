import React from "react";
import styles from "./button.module.css";

import SvgIcon from "@mui/material/SvgIcon";

function Button({ tag, icon }) {
  return (
    <div className={styles.button}>
      {icon && <SvgIcon className={styles.icon}>{icon}</SvgIcon>}
      <p className={styles.tag}>{tag}</p>
    </div>
  );
}

export default Button;
