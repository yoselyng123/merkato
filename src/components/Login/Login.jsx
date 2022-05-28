import React, { useState } from "react";
import styles from "./login.module.css";

function Login({ click }) {
  const [isRegistrando, setIsRegistrando] = useState(false);

  return (
    <div className={styles.login}>
      <p>{isRegistrando ? "Sign Up" : "Log in"}</p>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
      <input type="submit" value={isRegistrando ? "Sign Up" : "Log in"} />

      <div>
        {isRegistrando ? (
          <>
            <p>Already have an account</p>
            <p onClick={() => setIsRegistrando(!isRegistrando)}>Log in</p>
          </>
        ) : (
          <>
            <p>Don't have an account</p>
            <p onClick={() => setIsRegistrando(!isRegistrando)}>Sign Up</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
