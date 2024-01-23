import { useParams } from "react-router-dom";
import mockLevels from "../../mockData"

import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header"
import Gameboard from "../Gameboard/Gameboard";

const Level = () => {

  const { levelId } = useParams();

  const level = mockLevels.levels.find(level => level.id === levelId)

  if (level === undefined) return <ErrorPage></ErrorPage>

  return (
    <div>
       <Header characters={level.characters}> </Header>
       <Gameboard level={level}> </Gameboard>
    </div>
  )
}

export default Level