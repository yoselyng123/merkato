import PulseLoader from "react-spinners/PulseLoader";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.text}>Cargando</div>
      <PulseLoader
        color={"#2D914C"}
        loading={true}
        size={25}
        css={styles.loading}
      />
    </div>
  );
};

export default Loading;
