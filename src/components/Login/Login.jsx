import React, { useState } from "react";
import styles from "./login.module.css";
import SvgIcon from "@mui/material/SvgIcon";
/* Utils */
import firebaseExports from "../../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const auth = firebaseExports.auth;
const firestore = firebaseExports.db;
const provider = new GoogleAuthProvider();

function Login({ click }) {
  const [isRegistrando, setIsRegistrando] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    console.log("submit", email, password);

    if (isRegistrando) {
      // Register
      registrarUsuario(email, password);
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  };

  const registrarUsuario = async (email, password) => {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

    const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
    const consulta = await getDoc(docuRef);
    if (!consulta.exists()) {
      setDoc(docuRef, { email: email, rol: "cliente" });
      const infoDocu = consulta.data();
      return infoDocu;
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.exitbutton} onClick={() => click()}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </SvgIcon>
      </div>
      <p>{isRegistrando ? "Sign Up" : "Log in"}</p>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="email" id="email" />
        <input type="text" placeholder="password" id="password" />
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
      </form>
    </div>
  );
}

export default Login;
