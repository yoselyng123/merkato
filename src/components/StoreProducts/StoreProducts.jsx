import { SvgIcon } from "@mui/material";
import Product from "../Product/Product";
import styles from "./storeProducts.module.css";

function StoreProducts({ comercio, productosSearch }) {
  /* function ProductDisplay() {
    return (
      <div className={styles.productDisplayWrapper}>
        <div className={styles.productDisplayImgWrapper}>
          <img
            src="https://i5.walmartimages.com/asr/eb1893c6-ff33-4a36-ba05-d7fe42b67fbf.830244cad6037e9c0b18c4c237259b5d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
            alt=""
          />
        </div>
        <p className={styles.productDisplayTitle}>Pimenton</p>
      </div>
    );
  } */

  return (
    <div className={styles.storeProducts}>
      <div className={styles.topSecWrapper}>
        <div className={styles.topSecLeft}>
          <div className={styles.storeImgWrapper}>
            <img src={comercio.foto} alt="" />
          </div>
          <div className={styles.storeInfoWrapper}>
            <p className={styles.storeTitle}>{comercio.nombre}</p>
            <p className={styles.storeDelivery}>Delivery Available</p>
            <p className={styles.storePickup}>Pickup Available</p>
          </div>
        </div>
        <div className={styles.topSecRight}>
          <p>View all items</p>
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
            </svg>
          </SvgIcon>
        </div>
      </div>
      <div className={styles.productListWrapper}>
        {productosSearch &&
          productosSearch.map(
            (product) =>
              product.id_comercio === comercio.id && (
                <Product
                  key={product.id}
                  data={product}
                  idComercio={comercio.id}
                />
              )
          )}
      </div>
    </div>
  );
}

export default StoreProducts;
