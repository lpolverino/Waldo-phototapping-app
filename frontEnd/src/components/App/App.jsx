import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import LevelSelector from "../LevelSelector/LevelSelector"
import styles from "./app.module.css"
import enviroment from "../../enviroment"

function App() {
  return (
    <div className={styles.app}>
      <Header time={-1}></Header>
      <div className={styles.main}>
        <LevelSelector url={enviroment.getBackEnd()}></LevelSelector>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
