import PropTypes from 'prop-types';

const PopUpMenu = ({characters, clickCharacter}) => {
  return (
    <div>
        {characters.map(character => {
            return (
                <div key={character.id}>
                    <button onClick={() =>clickCharacter(character.id)}>
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
    clickCharacter: PropTypes.func
}

export default PopUpMenu