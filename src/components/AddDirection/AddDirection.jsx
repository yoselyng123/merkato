import React, { useState, useContext } from "react";
import styles from "./addDirection.module.css";
import { SvgIcon } from "@mui/material";
import DisplayAddress from "../DisplayAddress/DisplayAddress";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";

function AddDirection({
  setDirectionClick,
  directionClick,
  setNext,
  addresses,
  setAddress,
}) {
  const { user, setUser } = useContext(UserContext);

  function ListAddresses() {
    return addresses.map((addr, index) => {
      return (
        <DisplayAddress
          address={addr}
          key={index}
          num={index}
          setAddress={setAddress}
          setDirectionClick={setDirectionClick}
          setNext={setNext}
          setUpdateAddress={setUpdateAddress}
          setLineAddress1={setLineAddress1}
          setLineAddress2={setLineAddress2}
          setZipCode={setZipCode}
          setDeliveryInstructions={setDeliveryInstructions}
          setKeyUpdate={setKeyUpdate}
        />
      );
    });
  }

  const [lineAddress1, setLineAddress1] = useState("");
  const [lineAddress2, setLineAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [newAddress, setNewAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const [keyUpdate, setKeyUpdate] = useState(-1);

  const handleSubmit = async () => {
    if (lineAddress1 !== "" && zipCode !== "") {
      addresses.push({
        lineAddress1: lineAddress1,
        lineAddress2: lineAddress2,
        zipCode: zipCode,
        deliveryInstructions: deliveryInstructions,
      });

      if (user) {
        const userRef = doc(db, "users", user.id);
        setUser({ ...user, direcciones: addresses });
        await updateDoc(userRef, {
          direcciones: addresses,
        });
      }
    }
  };

  const handleUpdateAddress = async () => {
    addresses.pop(keyUpdate);

    addresses.push({
      lineAddress1: lineAddress1,
      lineAddress2: lineAddress2,
      zipCode: zipCode,
      deliveryInstructions: deliveryInstructions,
    });

    if (user) {
      const userRef = doc(db, "users", user.id);
      setUser({ ...user, direcciones: addresses });
      await updateDoc(userRef, {
        direcciones: addresses,
      });
    }
  };

  const handleDeleteAddress = async () => {
    addresses.pop(keyUpdate);
    if (user) {
      const userRef = doc(db, "users", user.id);
      setUser({ ...user, direcciones: addresses });
      await updateDoc(userRef, {
        direcciones: addresses,
      });
    }
  };

  return (
    <div className={styles.directions}>
      {addresses.length === 0 || newAddress || updateAddress ? (
        <>
          <div className={styles.directionsTop}>
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
              </svg>
            </SvgIcon>

            <p>Añadir nueva direccion</p>
          </div>
          <div className={styles.infoForm}>
            <input
              type="text"
              placeholder="Linea de direccion 1"
              value={lineAddress1}
              onChange={(e) => setLineAddress1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Linea de direccion 2 (opcional)"
              value={lineAddress2}
              onChange={(e) => setLineAddress2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Codigo Zip"
              className={styles.zipCode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Instrucciones para el delivery (opcional)"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
            />
          </div>
          <div className={styles.btnsWrapper}>
            <p onClick={() => setDirectionClick(!directionClick)}>Cancel</p>
            {updateAddress && (
              <p
                onClick={() => {
                  setDirectionClick(!directionClick);
                  handleDeleteAddress();
                }}
                style={{ color: "red" }}
              >
                Delete
              </p>
            )}
            <input
              type="submit"
              value="Save"
              onClick={() => {
                if (updateAddress) {
                  handleUpdateAddress();
                  setDirectionClick(!directionClick);
                  setNext(true);
                } else {
                  handleSubmit();
                  setDirectionClick(!directionClick);
                  setNext(true);
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className={styles.listAddressesWrapper}>
          <div className={styles.directionsTop}>
            <SvgIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
              </svg>
            </SvgIcon>

            <p>Añadir nueva direccion</p>
          </div>
          <ListAddresses />
          <p
            className={styles.newAddressBtn}
            onClick={() => setNewAddress(true)}
          >
            Agregar nueva direccion
          </p>
        </div>
      )}
    </div>
  );
}

export default AddDirection;
