import styles from "./login.module.css";
import SvgIcon from "@mui/material/SvgIcon";
/* Utils */
import firebaseExports from "../../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import RoleTypes from "../RoleTypes/RoleTypes";

const auth = firebaseExports.auth;
const firestore = firebaseExports.db;

function Login({ click, isRegistrando, setIsRegistrando }) {
  const [rol, setRol] = useState("");
  const [userUid, setUserUid] = useState("");
  const [newLoginGoogle, setNewLoginGoogle] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

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
      click();
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
      if (errorCode === "auth/weak-password") {
        setInvalidPassword(true);
      }
    });

    if (!invalidPassword && infoUsuario) {
      const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`);
      const consulta = await getDoc(docuRef);
      if (!consulta.exists()) {
        setDoc(docuRef, { email: email, rol: rol });
        const infoDocu = consulta.data();
        return infoDocu;
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        // ...

        const docuRef = doc(firestore, `users/${user.uid}`);
        const consulta = await getDoc(docuRef);

        if (consulta.exists()) {
          console.log("YA EXISTE");
          click();
        } else {
          console.log("NO EXISTE");
          await setDoc(doc(firestore, "users", user.uid), {
            email: user.email,
            rol: "",
          });

          setNewLoginGoogle(true);
          setIsRegistrando(true);
          setUserUid(user.uid);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleBack = () => {
    setRol("");
  };
  return (
    <div className={styles.login}>
      {rol === "" && isRegistrando ? (
        <div className={styles.contentContainer}>
          <div
            className={styles.exitbutton}
            style={{ marginBottom: "1rem" }}
            onClick={() => click()}
          >
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </SvgIcon>
          </div>
          <RoleTypes
            newLoginGoogle={newLoginGoogle}
            firestore={firestore}
            userUid={userUid}
            setRol={setRol}
            click={click}
          />

          <hr />

          <div>
            {isRegistrando ? (
              <div className={styles.bottom}>
                <p>Already have an account</p>
                <p
                  className={styles.link}
                  onClick={() => setIsRegistrando(!isRegistrando)}
                >
                  Log in
                </p>
              </div>
            ) : (
              <div className={styles.bottom}>
                <p>Don't have an account</p>
                <p
                  className={styles.link}
                  onClick={() => setIsRegistrando(!isRegistrando)}
                >
                  Sign Up
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.topSec}>
            {isRegistrando && (
              <div className={styles.exitbutton} onClick={() => handleBack()}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
                  </svg>
                </SvgIcon>
              </div>
            )}

            <div className={styles.exitbutton} onClick={() => click()}>
              <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </SvgIcon>
            </div>
          </div>
          <p className={styles.title}>{isRegistrando ? "Sign Up" : "Log in"}</p>
          <p style={{ fontSize: "0.9rem" }}>
            {isRegistrando
              ? "Enter your email and password to get started."
              : null}
          </p>
          <form onSubmit={submitHandler} className={styles.form}>
            <input type="text" placeholder="email" id="email" />
            <input type="text" placeholder="password" id="password" />
            {invalidPassword && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "red",
                  textAlign: "center",
                }}
              >
                ** Password should be at least 6 characters **
              </p>
            )}

            {isRegistrando ? (
              <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                By continuing, you agree to our Terms of Service
              </p>
            ) : (
              <p>
                Forgot password? <span className={styles.link}>Reset it</span>
              </p>
            )}

            <input
              className={styles.submit}
              type="submit"
              value={isRegistrando ? "Sign Up" : "Log in"}
            />

            <hr />

            <div
              className={styles.otherLogInBtn}
              onClick={handleSignInWithGoogle}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt=""
                className={styles.icon}
              />
              <p>Continue with Google</p>
            </div>

            <hr />

            <div>
              {isRegistrando ? (
                <div className={styles.bottom}>
                  <p>Already have an account</p>
                  <p
                    className={styles.link}
                    onClick={() => setIsRegistrando(!isRegistrando)}
                  >
                    Log in
                  </p>
                </div>
              ) : (
                <div className={styles.bottom}>
                  <p>Don't have an account</p>
                  <p
                    className={styles.link}
                    onClick={() => setIsRegistrando(!isRegistrando)}
                  >
                    Sign Up
                  </p>
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
