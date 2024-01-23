import { useState } from "react"
import mockLevels from "../../mockData"
import { Link } from "react-router-dom"


const LevelSelector = () => {

  const [levels, setLevels] = useState(mockLevels.levels)

  return (
    <div>
      <ul>
        {levels.map(level =>
            <li key={level.id}>
              <Link to={"level/"+level.id}>
                {level.name}
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default LevelSelector