import "./App.module.css";
import styles from "./App.module.css";
import SideBar from "./components/SideBar/SideBar";
import CarritoPage from "./pages/CarritoPage";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div className={styles.app}>
      <NavBar />
      <CarritoPage />
      {/* <Home /> */}
    </div>
  );
}

export default App;
