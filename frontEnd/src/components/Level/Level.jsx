import { useParams } from "react-router-dom";
import mockLevels from "../../mockData"

import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header"
import Gameboard from "../Gameboard/Gameboard";
import {useState } from "react";

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
    <div>
      <div onClick={(e) => {e.preventDefault();setMouse({intent:mouse.intents, pressed:false})}}>
         <Header characters={level.characters}> </Header>
      </div>
       <Gameboard level={level} mouse={mouse} setMouse={setMouse}> </Gameboard>
    </div>
  )
}

export default Level