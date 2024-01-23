import { useParams } from "react-router-dom";
import mockLevels from "../../mockData"

import ErrorPage from "../ErrorPage/ErrorPage";

const Level = () => {

  const { levelId } = useParams();

  const level = mockLevels.levels.find(level => level.id === levelId)

  if (level === undefined) return <ErrorPage></ErrorPage>

  return (
    <div>{levelId}</div>
  )
}

export default Level