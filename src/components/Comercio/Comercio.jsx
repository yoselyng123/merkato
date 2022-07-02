import { useContext } from "react";
import styles from "./comercio.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Comercio({ data, setIdComercio }) {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const handleClickComercio = () => {
    // setIdComercio(data.id);

    if (user && user.rol === "admin") {
      navigate(`../${data.nombre}/${data.id}/admin`, { replace: true });
    } else {
      navigate(`../${data.nombre}/${data.id}/shop`, { replace: true });
    }
  };

  return (
    <div className={styles.comercio} onClick={handleClickComercio}>
      <div className={styles.imgContainer}>
        <img src={data.foto} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{data.nombre}</h1>
        <h1 className={styles.subtitle}>delivery by 12:00am</h1>
      </div>
    </div>
  );
}

export default Comercio;
