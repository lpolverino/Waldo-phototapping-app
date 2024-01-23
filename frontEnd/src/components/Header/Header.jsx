import PropTypes from 'prop-types';
import styles from "./header.module.css"

const Header = ({characters}) => {

  const renderCharacters = () => {
    if(characters.length !== 0){
        return(
          <ul>
            {characters.map( character =>
               <li className={styles.character} key={character.id}>
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
        <h1 className={styles.title}>Find Waldo!</h1>
        <div className={styles.characters}>
           {
            renderCharacters()
           }
        </div>
    </div>
  )
}

Header.propTypes = {
    characters: PropTypes.array,
};

Header.defaultProps = {
    characters: [],
  };

export default Header