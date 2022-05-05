import React from "react";
import "./home.css";

import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

function Home() {
  return (
    <div className="home">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="contentWrapper">
        <NavBar />
      </div>
    </div>
  );
}

export default Home;
