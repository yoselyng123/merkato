import React from "react";
import styles from "./noMatch.module.css";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className={styles.noMatch}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/7465/7465857.png"
        alt=""
      />
      <p className={styles.title}>There were no search results.</p>
      <p className={styles.subtitle}>
        Please check your spelling or use different keywords.
      </p>

      <Link to="/" className={styles.btn}>
        <p>Return to home</p>
      </Link>
    </div>
  );
}

export default NoMatch;
