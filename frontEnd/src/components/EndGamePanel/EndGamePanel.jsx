import { useState } from "react"
import styles from "./end-game-panel.module.css"

const EndGamePanel = ({score}) => {
  const [name, setName] = useState('Anonimus')

  return (
    <div className={styles.displayer}>
        <h2>YOU WON!</h2>
        <p>Score{score}</p>
        <form action="">
            <label htmlFor="name">Name</label>
            <input type="text"  name="name" id="name" value={name} onChange={(e) => {e.preventDefault() ; setName(e.target.value)}}/>
        </form>
    </div>
  )
}

export default EndGamePanel