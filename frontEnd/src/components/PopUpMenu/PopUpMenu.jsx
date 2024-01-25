import PropTypes from 'prop-types';
import styles from "./pop-up-menu.module.css"

const PopUpMenu = ({characters, clickCharacter, position}) => {
  return (
    <div className={styles.popup} style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
    }}>
        {characters.map(character => {
            return (
                <div key={character.id} className={styles.character}>
                    <button onClick={(e) =>clickCharacter(e, character.id)}>
                        <img src={character.img} alt={`image of ${character.name}`} />
                        <p>{character.name}</p>
                    </button>
                </div>
            )
        } )}
    </div>
  )
}

PopUpMenu.propTypes = {
    characters:PropTypes.arrayOf(PropTypes.shape({
        name:PropTypes.string,
        img:PropTypes.string.isRequired
    })),
    clickCharacter: PropTypes.func,
    position: PropTypes.shape({
        x:PropTypes.number,
        y:PropTypes.number,
      })
}

export default PopUpMenu