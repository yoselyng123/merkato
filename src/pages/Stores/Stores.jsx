import React from "react";
import styles from "./stores.module.css";
import BannerStores from "../../components/BannerStores/BannerStores";
import ListComercios from "../../components/ListComercios/ListComercios";

function Stores({ comercios, setIdComercio }) {
  return (
    <div className={styles.stores}>
      <BannerStores />
      <div style={{ padding: "1% 15%" }}>
        <ListComercios comercios={comercios} setIdComercio={setIdComercio} />
      </div>
      <div className={styles.infoSection}>
        <p className={styles.infoTitle}>Delivery en el que puedes confiar</p>
        <div className={styles.cardsWrapper}>
          <div className={styles.cardE}>
            <div className={styles.infoWrapper}>
              <p className={styles.title}>Escoge lo que quieras</p>
              <p className={styles.text}>
                Selecciona productos de tus tiendas de mercado favoritos en
                merkato.com
              </p>
            </div>
            <div className={styles.imgWrapper}>
              <img
                src="https://recursos.bps.com.es/files/782/78.jpg"
                alt=""
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.cardE}>
            <div className={styles.infoWrapper}>
              <p className={styles.title}>Actualizaciones en tiempo real</p>
              <p className={styles.text}>
                Chatea con los compradores mientras compran y maneja tu orden.
              </p>
            </div>
            <div className={styles.imgWrapper}>
              <img
                src="https://us.123rf.com/450wm/solomapoppy/solomapoppy1706/solomapoppy170600004/79884801-tel%C3%A9fono-m%C3%B3vil-chat-notificaciones-mensaje-ilustraci%C3%B3n-vectorial-aislados-en-fondo-de-color-la-mano-.jpg"
                alt=""
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.cardE}>
            <div className={styles.infoWrapper}>
              <p className={styles.title}>Delivery el mismo dia</p>
              <p className={styles.text}>
                Selecciona un horario conveniente para ti. Disfruta de comprar
                en Merkato
              </p>
            </div>
            <div className={styles.imgWrapper}>
              <img
                src="https://us.123rf.com/450wm/frannyanne/frannyanne1407/frannyanne140700012/30549421-una-bolsa-de-papel-marr%C3%B3n-lleno-hasta-el-tope-con-variedades-de-frutas-sobre-una-superficie-de-mader.jpg?ver=6"
                alt=""
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <p className={styles.infoTitle}>
          El mejor servicio de compras en Caracas
        </p>
        <div className={styles.bannerBottomSectionWrapper}>
          <img
            src="http://especializate.usat.edu.pe/wp-content/uploads/2020/04/%C2%BFC%C3%B3mo-reinventar-los-negocios-en-tiempos-de-coronavirus.jpg"
            alt=""
            className={styles.bannerBottomSection}
          />
        </div>
        <div className={styles.miniCardWrapper}>
          <div className={styles.miniCard}>
            <p className={styles.title}>5000 productos</p>
            <p className={styles.miniCardtText}>disponibles en el catalogo.</p>
          </div>
          <div className={styles.miniCard}>
            <p className={styles.title}>+20 tiendas</p>
            <p className={styles.miniCardtText}>todas tus tiendas favoritas.</p>
          </div>
          <div className={styles.miniCard}>
            <p className={styles.title}>En toda Caracas</p>
            <p className={styles.miniCardtText}>llegamos a toda la ciudad.</p>
          </div>
          <div className={styles.miniCard}>
            <p className={styles.title}>Miles de ordenes</p>
            <p className={styles.miniCardtText}>entregadas al año.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stores;
