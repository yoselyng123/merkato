import React from "react";
import styles from "./roleTypes.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
function RoleTypes({
  click
}) {
  const { setRol, user, setUser } = useContext(UserContext);
  const handleClick = async (type) => {
    if (user) {
      console.log("Entra");
      console.log(user.id);
      const userRef = doc(db, "users", user.id);
      setUser({ ...user, rol: type });
      await updateDoc(userRef, {
        rol: type,
      });
      localStorage.setItem("rol", type);
      click();
    } else {
      setRol(type);
      localStorage.setItem("rol", type);
    }
  };

  return (
    <div>
      <div onClick={() => handleClick("shopper")} className={styles.btn}>
        <p>{user ? "Log in as Shopper" : "Sign up as Shopper"}</p>
      </div>

      <div onClick={() => handleClick("delivery")} className={styles.btn}>
        <p>{user ? "Log in as Delivery" : "Sign up as Delivery"}</p>
      </div>
    </div>
  );
}

export default RoleTypes;
