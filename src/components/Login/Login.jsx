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
import { useState } from "react";
import RoleTypes from "../RoleTypes/RoleTypes";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const auth = firebaseExports.auth;

function Login({ click, isRegistrando, setIsRegistrando }) {
  const [wrongData, setWrongData] = useState({
    email: false,
    wrongPassword: false,
    invalidPassword: false,
    userNotFound: false,
  });

  const { carrito, createUser, user, rol, setRol } = useContext(UserContext);

  // Handle Form Submit Login and Sign up
  const submitHandler = async (e) => {
    // prevent page reload
    e.preventDefault();
    // get input from user
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Checks if user is registering or loging in
    if (isRegistrando) {
      // Register
      registrarUsuario(email, password);
    } else {
      // login
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Error handler - notify user
        if (errorCode === "auth/wrong-password") {
          setWrongData({
            email: false,
            wrongPassword: true,
            invalidPassword: false,
            userNotFound: false,
          });
        } else if (errorCode === "auth/user-not-found") {
          setWrongData({
            email: false,
            wrongPassword: false,
            invalidPassword: false,
            userNotFound: true,
          });
        } else if (errorCode === "auth/invalid-email") {
          setWrongData({
            email: true,
            wrongPassword: false,
            invalidPassword: false,
            userNotFound: false,
          });
        }
        console.log(errorCode, errorMessage);
      }
      // click();
    }
  };

  const registrarUsuario = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUser(
        {
          email: email,
          rol: rol,
          carrito: carrito,
          direcciones: [],
          appliedPromos: [],
          carritoFavorito: [],
        },
        response.user.uid
      );

      click();
    } catch (error) {
      console.log(error.code);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === "auth/weak-password") {
        setWrongData({
          email: false,
          wrongPassword: false,
          invalidPassword: true,
          userNotFound: false,
        });
      }
      if (errorCode === "auth/invalid-email") {
        setWrongData({
          email: true,
          wrongPassword: false,
          invalidPassword: false,
          userNotFound: false,
        });
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // setNewLoginGoogle(true);
      // setIsRegistrando(true);
      click();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode, errorMessage, email, credential);
    }
  };

  const handleBack = () => {
    setRol("");
  };
  return (
    <div className={styles.login}>
      {user && user.rol === "" && (
        <>
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
            <RoleTypes click={click} />
          </div>
        </>
      )}
      {!user && (
        <>
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
              <RoleTypes click={click} />

              <hr />

              <div>
                {isRegistrando ? (
                  <div className={styles.bottom}>
                    <p>Ya tengo una cuenta</p>
                    <p
                      className={styles.link}
                      onClick={() => setIsRegistrando(!isRegistrando)}
                    >
                      Iniciar Sesion
                    </p>
                  </div>
                ) : (
                  <div className={styles.bottom}>
                    <p>Don't have an account</p>
                    <p
                      className={styles.link}
                      onClick={() => setIsRegistrando(!isRegistrando)}
                    >
                      Registrarse
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className={styles.topSec}>
                {isRegistrando && (
                  <div
                    className={styles.exitbutton}
                    onClick={() => handleBack()}
                  >
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
                      </svg>
                    </SvgIcon>
                  </div>
                )}

                <div className={styles.exitbutton} onClick={() => click()}>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                    </svg>
                  </SvgIcon>
                </div>
              </div>
              <p className={styles.title}>
                {isRegistrando ? "Registrarse" : "Iniciar Sesion"}
              </p>
              <p style={{ fontSize: "0.9rem" }}>
                {isRegistrando
                  ? "Ingrese su email y contraseña para comenzar."
                  : null}
              </p>
              <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="email"
                    id="email"
                    className={
                      wrongData.email || wrongData.userNotFound
                        ? styles.errorOutline
                        : styles.noOutline
                    }
                  />
                  <input
                    type="text"
                    placeholder="password"
                    id="password"
                    className={
                      wrongData.wrongPassword || wrongData.invalidPassword
                        ? styles.errorOutline
                        : styles.noOutline
                    }
                  />
                </div>
                {wrongData.invalidPassword && (
                  <p className={styles.errorMsg}>
                    La contraseña debe tener al menos 6 caracteres.
                  </p>
                )}
                {wrongData.wrongPassword && (
                  <p className={styles.errorMsg}>Contraseña incorrecta.</p>
                )}
                {wrongData.email && (
                  <p className={styles.errorMsg}>Email invalido. </p>
                )}

                {!isRegistrando && wrongData.userNotFound && (
                  <p className={styles.errorMsg}>
                    No existe un usuario registrado con ese email.
                  </p>
                )}

                {isRegistrando ? (
                  <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                    Continuando, esta de acuerdo con los Terminos y condiciones
                  </p>
                ) : (
                  <p>
                    Olvido la contraseña?
                    <span className={styles.link}>Resetear</span>
                  </p>
                )}

                <input
                  className={styles.submit}
                  type="submit"
                  value={isRegistrando ? "Registrarse" : "Iniciar Sesion"}
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
                  <p>Continuar con Google</p>
                </div>

                <hr />

                <div>
                  {isRegistrando ? (
                    <div className={styles.bottom}>
                      <p>Ya tengo una cuenta</p>
                      <p
                        className={styles.link}
                        onClick={() => setIsRegistrando(!isRegistrando)}
                      >
                        Iniciar Sesion
                      </p>
                    </div>
                  ) : (
                    <div className={styles.bottom}>
                      <p>No tiene una cuenta</p>
                      <p
                        className={styles.link}
                        onClick={() => setIsRegistrando(!isRegistrando)}
                      >
                        Registrarse
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Login;
