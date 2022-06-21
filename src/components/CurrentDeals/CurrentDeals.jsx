import styles from "./currentDeals.module.css";

function CurrentDeals() {
  const colors = ["#003366", "#C10B22"];

  /* const [number, setNumber] = useState(0);

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
  }; */

  return (
    <div
      className={styles.currentDeals}
      style={{
        backgroundColor: `${colors[0]}`,
      }}
    >
      <div>
        <p className={styles.title}>$5 de descuento en tu primera compra</p>
        <p className={styles.productText}>Codigo: PRIMERMERKATO</p>

        <div className={styles.btn}>
          <p>Shop</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentDeals;
