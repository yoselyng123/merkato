import React, { useState } from "react";

import styles from "./currentDeals.module.css";
import SvgIcon from "@mui/material/SvgIcon";

function CurrentDeals() {
  const images = [
    "https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/4/AmazonStores/ATVPDKIKX0DER/14803c787411e61217d8d85bae543a82.w3000.h1000._CR0%2C0%2C3000%2C1000_SX1500_.jpg",
    "https://img.freepik.com/foto-gratis/alimentos-frescos-comestibles-caja-bandeja-fondo-banner-mesa-madera_8087-2719.jpg?w=2000",
    "https://www.nidolove.com/sites/default/files/inline-images/EN-nido-product-banner-latest-desktop.jpg",
    "https://t4.ftcdn.net/jpg/03/20/46/13/360_F_320461388_5Snqf6f2tRIqiWlaIzNWrCUm1Ocaqhfm.jpg",
  ];

  const [number, setNumber] = useState(0);

  const handleClick = (position) => {
    if (position === "left") {
      if (number !== 0) {
        setNumber(number - 1);
      }
    }
    if (position === "right") {
      if (number !== images.length - 1) {
        setNumber(number + 1);
      }
    }
  };

  return (
    <div
      className={styles.currentDeals}
      style={{
        backgroundImage: `url(${images[number]})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <SvgIcon onClick={() => handleClick("left")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
        </svg>
      </SvgIcon>

      <SvgIcon onClick={() => handleClick("right")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
        </svg>
      </SvgIcon>
    </div>
  );
}

export default CurrentDeals;
