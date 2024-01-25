import PropTypes from 'prop-types';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import {Backend} from '../Level/Level';
import { useContext } from 'react';

const Gameboard = ({levelData, levelImg, mouse, setMouse}) => {

  const {characters} = useContext(Backend)

  const handleCharacterClick = (e, characterId) =>{
    e.preventDefault()
    console.log(`clicked on ${characterId}`);
    setMouse({pressed: false, intents: mouse.intents +1})
  }

  const handlerClick = (e) =>{
    e.preventDefault()
    const newMousePosition = {
      x:e.clientX - e.target.offsetLeft,
      y:e.clientY - e.target.offsetTop
    }
    setMouse({...mouse, pressed:true, position:newMousePosition})
    console.log(newMousePosition);
  }

  return (
    <div>
      {mouse.pressed && <PopUpMenu characters={characters} clickCharacter={handleCharacterClick} position={mouse.position}></PopUpMenu>}
      <img className={"gameboard"} src={levelImg} onClick={(e) => handlerClick(e)}/>
    </div>
  )
}

Gameboard.propTypes = {
    levelData: PropTypes.shape(
        {
            name: PropTypes.string,
        }
    ),
    levelImg:PropTypes.string.isRequired,
    mouse: PropTypes.shape({
      intents: PropTypes.number,
      pressed: PropTypes.bool,
      position: PropTypes.shape({
        x:PropTypes.number,
        y:PropTypes.number,
      })
    }),
    setMouse: PropTypes.func,
}

export default Gameboard