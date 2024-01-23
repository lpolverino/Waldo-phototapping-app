import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import LevelSelector from "../LevelSelector/LevelSelector"
import styles from "./app.module.css"

function App() {

  return (
    <div className={styles.app}>
      <Header></Header>
      <div className={styles.main}>
        <LevelSelector></LevelSelector>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
