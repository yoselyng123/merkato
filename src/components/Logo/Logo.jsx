import React from "react";
import styles from "./logo.module.css";

import SvgIcon from "@mui/material/SvgIcon";

function Logo() {
  return (
    <div className={styles.logo}>
      <SvgIcon sx={{ fill: "var(--darkGreen)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M298.2 156.6C245.5 130.9 183.7 146.1 147.1 189.4l55.27 55.31c6.25 6.25 6.25 16.33 0 22.58c-3.127 3-7.266 4.605-11.39 4.605s-8.068-1.605-11.19-4.605L130.3 217l-128.1 262.8c-2.875 6-3 13.25 0 19.63c5.5 11.12 19 15.75 30 10.38l133.6-65.25L116.7 395.3c-6.377-6.125-6.377-16.38 0-22.5c6.25-6.25 16.37-6.25 22.5 0l56.98 56.98l102-49.89c24-11.63 44.5-31.26 57.13-57.13C385.5 261.1 359.9 186.8 298.2 156.6zM390.2 121.8C409.7 81 399.7 32.88 359.1 0c-50.25 41.75-52.51 107.5-7.875 151.9l8 8C404.5 204.5 470.4 202.3 512 152C479.1 112.3 430.1 102.3 390.2 121.8z" />
        </svg>
      </SvgIcon>
      <p>MERKATO</p>
    </div>
  );
}

export default Logo;
