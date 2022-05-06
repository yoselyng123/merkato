import React from "react";
import Button from "../Button/Button";
import styles from "./sideBar.module.css";

/* Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import PieChartIcon from "@mui/icons-material/PieChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChatIcon from "@mui/icons-material/Chat";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <p>MERKATO</p>
      <div className={styles.options}>
        <Button tag="Dashboard" Icon={DashboardIcon} />
        <Button tag="Categories" Icon={PieChartIcon} />
        <Button tag="Favourite" Icon={FavoriteIcon} />
        <Button tag="Orders" Icon={ReceiptIcon} />
        <Button tag="Messages" Icon={ChatIcon} />
        <Button tag="Top Deals" Icon={LocalOfferIcon} />
        <Button tag="Settings" Icon={SettingsIcon} />
      </div>
    </div>
  );
}

export default SideBar;
