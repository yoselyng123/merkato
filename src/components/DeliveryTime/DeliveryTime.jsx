import React, { useState } from "react";
import styles from "./deliveryTime.module.css";
import { SvgIcon } from "@mui/material";

function DeliveryTime({ setDirectionClick, directionClick, setNext, next }) {
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div className={styles.deliveryTime}>
      <div className={styles.directionsTop}>
        <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z" />
          </svg>
        </SvgIcon>

        <p>Delivery Time</p>
      </div>

      <div
        className={styles.option}
        onClick={() => {
          setDirectionClick(!directionClick);
          setNext(true);
        }}
      >
        <div className={styles.topLeft}>
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M240.5 224H352C365.3 224 377.3 232.3 381.1 244.7C386.6 257.2 383.1 271.3 373.1 280.1L117.1 504.1C105.8 513.9 89.27 514.7 77.19 505.9C65.1 497.1 60.7 481.1 66.59 467.4L143.5 288H31.1C18.67 288 6.733 279.7 2.044 267.3C-2.645 254.8 .8944 240.7 10.93 231.9L266.9 7.918C278.2-1.92 294.7-2.669 306.8 6.114C318.9 14.9 323.3 30.87 317.4 44.61L240.5 224z" />
            </svg>
          </SvgIcon>
          <div className={styles.infoWrap}>
            <p className={styles.title}>By 6:10pm-6:30pm</p>
            <p className={styles.subTitle}>Priority</p>
          </div>
        </div>
        <p className={styles.price}>+$2</p>
      </div>
      <div
        className={styles.option}
        onClick={() => {
          setDirectionClick(!directionClick);
          setNext(true);
        }}
      >
        <div className={styles.topLeft}>
          <SvgIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z" />
            </svg>
          </SvgIcon>
          <div className={styles.infoWrap}>
            <p className={styles.title}>By 7:25pm</p>
            <p className={styles.subTitle}>Standard</p>
          </div>
        </div>
        <p className={styles.price}>Free</p>
      </div>

      <div
        className={styles.btn}
        onClick={() => {
          setDirectionClick(!directionClick);
          setNext(true);
        }}
      >
        <p>Continue</p>
      </div>
    </div>
  );
}

export default DeliveryTime;
