import PropTypes from 'prop-types';
import styles from "./header.module.css"
import { Link } from 'react-router-dom';
import { Backend } from '../Level/Level';
import { useContext } from 'react';

const Header = ({clickCount}) => {

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
        {(clickCount !== 0 && clickCount !== undefined) && <p className={styles.intents}> cliked:{clickCount} </p>}
        <div className={styles.characters}>
           {
            renderCharacters()
           }
        </div>
    </div>
  )
}

Header.propTypes = {
    clickCount: PropTypes.number
};

Header.defaultProps = {
    characters: [],
  };

export default Header