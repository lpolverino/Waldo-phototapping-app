import PropTypes from 'prop-types';
import styles from "./header.module.css"
import { Link } from 'react-router-dom';
import { Backend } from '../Level/Level';
import { useContext } from 'react';

const MINUTE_IN_MS = 60000

const Timer = ({minutes, seconds}) =>{
  return (
    <div className={styles.timer}>
      <h2>Score:</h2>
      <p>{minutes}:{ (seconds < 10 ? "0" : "") + seconds}</p>
    </div>
  )
}

Timer.propTypes = {
  minutes:PropTypes.number,
  seconds:PropTypes.number,
}

const ClickCounter = ({clickCount}) => {

  return (
    <div className={styles.intents}>
      {(clickCount !== 0 && clickCount !== undefined) && <h2> cliked:{clickCount} </h2>}
    </div>
  )
}

ClickCounter.propTypes = {
  clickCount: PropTypes.number
}


const Header = ({clickCount, time}) => {
  const minutes = Math.floor(time/ MINUTE_IN_MS)
  const seconds = Math.floor((time/1000) % 60)

  const {characters} = useContext(Backend)

  const renderCharacters = () => {
    if(characters.length !== 0){
        return(
          <ul>
            {characters.map( character =>
               <li className={`${styles.character} ${character.founded?styles.founded: ""}`} key={character.id}>
                  <img className={styles.character_img} src={character.img}/>
                  <p className={styles.character_name}>{character.name}</p>
                </li>)}
          </ul>
        )
    }
    return
  }

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Link to="/"> Find Waldo! </Link>
      </div>
        {time >=0 && <Timer minutes={minutes} seconds={seconds}> </Timer> }
        <ClickCounter clickCount={clickCount}> </ClickCounter>
        <div className={styles.characters}>
           {
            renderCharacters()
           }
        </div>
    </div>
  )
}

Header.propTypes = {
    clickCount: PropTypes.number,
    time:PropTypes.number,
};

Header.defaultProps = {
    characters: [],
    time: -1
  };

export default Header