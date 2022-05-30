import React, { useState } from "react";

import styles from "./currentDeals.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function CurrentDeals() {
  const colors = ["#003366", "#C10B22"];

  const [number, setNumber] = useState(0);

  const handleClick = (position) => {
    if (position === "left") {
      if (number !== 0) {
        setNumber(number - 1);
      }
    }
    if (position === "right") {
      if (number !== colors.length - 1) {
        setNumber(number + 1);
      }
    }
  };

  return (
    <div
      className={styles.currentDeals}
      style={{
        backgroundColor: `${colors[number]}`,
      }}
    >
      <div>
        <p className={styles.title}>$5 off or Free Delivery on</p>
        <p className={styles.productText}>Snacks</p>

        <div className={styles.btn}>
          <p>Shop Snacks</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentDeals;
