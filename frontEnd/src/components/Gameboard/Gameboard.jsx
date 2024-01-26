import PropTypes from 'prop-types';
import PopUpMenu from '../PopUpMenu/PopUpMenu';
import {Backend} from '../Level/Level';
import { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from "./gameboard.module.css"


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Gameboard = ({levelData, levelImg, mouse, setMouse, setCharacterFounded, levelDimensions}) => {

  const [messege, setMessege] = useState(null)

  const {characters, url} = useContext(Backend)
  const {levelId} = useParams()

  const { height, width } = useWindowDimensions();

  const getResponseText = (succed, characterId) =>{
    if(!succed) return "try again!"
    const characterFound = characters.find(character => character.id === characterId)
    return `Ỳou found ${characterFound.name}`
  }

  const sendPosition = async (characterId) =>{
    try{
      const response = await fetch(url,{
        method:"post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          positionX:mouse.position.x,
          positionY:mouse.position.y,
          characterId
        })
      })
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json()
    }
    catch(error){
      console.log(error.message);
    }
  }

  const handleCharacterClick = async (e, characterId) =>{
    e.preventDefault()
    console.log(`clicked on ${characterId}`);
    setMouse({pressed: false, intents: mouse.intents +1})
    const positionData = await sendPosition(characterId)
    console.log(positionData.succed)
    if (messege=== null){
      setTimeout(() =>{
        setMessege(null)
      },3000)
    }
    setMessege(getResponseText(positionData.succed, characterId) )
    setCharacterFounded(characterId, positionData.succed)
  }

  const getAcutalPosition = (position, currentSize, originalSize) =>{
    const currentPorcentage =  (originalSize)/currentSize
    return Math.round(position * (currentPorcentage))

  } 

  const handlerClick = (e) =>{
    e.preventDefault()
    console.log(window.scrollY);
    const imgAactualHeight = e.target.height
    const imgAactualWidth = e.target.width

   // console.log(`actual img size (${imgAactualWidth}; ${imgAactualHeight})`);
   // console.log(`original img size (${levelDimensions.width};${levelDimensions.height})`);
    const mouseCordinatesInImg = {
      x:e.clientX - e.target.offsetLeft,
      y:e.clientY - e.target.offsetTop + window.scrollY
    }

    console.log(
      `mouse clicked in ${mouseCordinatesInImg.x} ; ${mouseCordinatesInImg.y}`
    );

    const newMousePosition = {
      x:getAcutalPosition(mouseCordinatesInImg.x,imgAactualWidth,levelDimensions.width ),
      y:getAcutalPosition(mouseCordinatesInImg.y,imgAactualHeight,levelDimensions.height )
    }
    setMouse({...mouse, pressed:true, position:newMousePosition})
    //console.log(newMousePosition);
    console.log(
      `the real position is (${getAcutalPosition(mouseCordinatesInImg.x,imgAactualWidth,levelDimensions.width )}; ${getAcutalPosition(mouseCordinatesInImg.y,imgAactualHeight,levelDimensions.height )}) `
      )
  }

  return (
    <div>
      {messege!== null && <div className={styles.messege}>
        <p>{messege}</p>
      </div>}
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
    setCharacterFounded: PropTypes.func,
    levelDimensions: PropTypes.shape({
      width:PropTypes.number,
      height:PropTypes.number,
    })
}

export default Gameboard