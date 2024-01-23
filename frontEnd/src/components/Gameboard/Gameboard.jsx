import PropTypes from 'prop-types';
import { useState } from 'react';
import PopUpMenu from '../PopUpMenu/PopUpMenu';

const Gameboard = ({level}) => {

  const [mousePressed , setMousePressed] = useState(false)

  const handleCharacterClick = (characterId) =>{
    console.log(`clicked on ${characterId}`);
  }

  const handlerClick = (e) =>{
    e.preventDefault()
    setMousePressed(true)
    console.log(`(${e.clientX - e.target.offsetLeft}) ; ${e.clientY - e.target.offsetTop})`);
  }

  return (
    <div onClick={(e) => handlerClick(e)}>
      {mousePressed && <PopUpMenu characters={level.characters} clickCharacter={handleCharacterClick}></PopUpMenu>}
      <img src={level.img}/>
    </div>
  )
}

Gameboard.propTypes = {
    level: PropTypes.shape(
        {
            name: PropTypes.string,
            img:PropTypes.string.isRequired,
            characters:PropTypes.arrayOf(PropTypes.shape({
                name:PropTypes.string,
                img:PropTypes.string.isRequired
            }))
        }
    )
}

export default Gameboard