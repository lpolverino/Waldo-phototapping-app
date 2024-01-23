import PropTypes from 'prop-types';

const PopUpMenu = ({characters, clickCharacter, position}) => {
  return (
    <div style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
    }}>
        {characters.map(character => {
            return (
                <div key={character.id}>
                    <button onClick={(e) =>clickCharacter(e, character.id)}>
                        <img src={character.img} alt={`image of ${character.name}`} />
                        {character.name}
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