import React from "react";
import styles from "./logo.module.css";

import SvgIcon from "@mui/material/SvgIcon";

function Logo() {
  return (
    <div className={styles.logo}>
      <SvgIcon sx={{ fill: "var(--darkGreen)", fontSize: "1.8rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M18 21q.65 0 1.075-.425.425-.425.425-1.075V15h-3v4.5q0 .65.425 1.075Q17.35 21 18 21Zm1.5-9.5v.5h9v-.5q0-1.9-1.3-3.2Q25.9 7 24 7q-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2ZM30 21q.65 0 1.075-.425.425-.425.425-1.075V15h-3v4.5q0 .65.425 1.075Q29.35 21 30 21ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V15q0-1.2.9-2.1.9-.9 2.1-.9h5.5v-.5q0-3.15 2.175-5.325Q20.85 4 24 4q3.15 0 5.325 2.175Q31.5 8.35 31.5 11.5v.5H37q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Z" />
        </svg>
      </SvgIcon>
      <p>MERKATO</p>
    </div>
  );
}

export default Logo;
