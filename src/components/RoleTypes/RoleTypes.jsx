import React from "react";
import styles from "./roleTypes.module.css";

import { doc, updateDoc } from "firebase/firestore";

function RoleTypes({ newLoginGoogle, firestore, userUid, setRol }) {
  const handleClick = async (type) => {
    console.log("CLICK");
    if (newLoginGoogle) {
      const userRef = doc(firestore, "users", userUid);

      await updateDoc(userRef, {
        rol: type,
      });
    } else {
      setRol(type);
    }
  };

  return (
    <div>
      <div onClick={() => handleClick("shopper")} className={styles.btn}>
        <p>{newLoginGoogle ? "Log in as Shopper" : "Sign in as Shopper"}</p>
      </div>

      <div onClick={() => handleClick("delivery")} className={styles.btn}>
        <p>{newLoginGoogle ? "Log in as Delivery" : "Sign in as Delivery"}</p>
      </div>
    </div>
  );
}

export default RoleTypes;
