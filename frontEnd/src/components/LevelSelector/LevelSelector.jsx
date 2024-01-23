import { useState } from "react"
import mockLevels from "../../mockData"
import { Link } from "react-router-dom"
import styles from "./level-selector.module.css"

const LevelSelector = () => {

  const [levels, setLevels] = useState(mockLevels.levels)

  return (
    <div>
      <ul className={styles.card_displayer}>
        {levels.map(level =>
            <li key={level.id}>
              <div className={styles.card}>
                <Link to={"level/"+level.id}>
                  <h3>{level.name}</h3>
                  <img src={level.img}/>
                </Link>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default LevelSelector