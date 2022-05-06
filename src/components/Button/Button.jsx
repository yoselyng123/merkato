import React from "react";
import styles from "./button.module.css";

function Button({ tag, Icon }) {
  return (
    <div className={styles.button}>
      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon
            sx={{ ":hover": { fill: "#FFF" }, fill: "#000" }}
            fontSize="inherit"
          />
        </div>
      )}
      <p>{tag}</p>
    </div>
  );
}

export default Button;
