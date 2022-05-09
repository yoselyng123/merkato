import "./App.module.css";
import styles from "./App.module.css";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <div className={styles.app}>
      {/* <Home /> */}
      <Landing />
    </div>
  );
}

export default App;
