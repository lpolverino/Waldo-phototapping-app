import { useParams } from "react-router-dom";
import mockLevels from "../../mockData"

import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header"
import Gameboard from "../Gameboard/Gameboard";
import {useState } from "react";
import Footer from "../Footer/Footer"
import styles from "./level.module.css"

const Level = () => {

  const [mouse, setMouse] = useState({
    pressed: false,
    intents:0,
    position:null
  })

  const { levelId } = useParams();

  const level = mockLevels.levels.find(level => level.id === levelId)

  if (level === undefined) return <ErrorPage></ErrorPage>

  return (
    <div className={styles.level}>
      <div onClick={(e) => {e.preventDefault();setMouse({...mouse, pressed:false})}}>
         <Header characters={level.characters} clickCount={mouse.intents}> </Header>
      </div>
       <Gameboard level={level} mouse={mouse} setMouse={setMouse}> </Gameboard>
       <Footer></Footer>
    </div>
  )
}

export default Level