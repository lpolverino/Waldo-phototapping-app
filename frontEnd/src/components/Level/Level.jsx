import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Header from "../Header/Header"
import Gameboard from "../Gameboard/Gameboard";
import { createContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer"
import styles from "./level.module.css"
import enviroment from "../../enviroment";
import EndGamePanel from "../EndGamePanel/EndGamePanel";

export const Backend = createContext({
  url:"",
  characters:[]
})

const Level = () => {

  const { levelId } = useParams();

  const [mouse, setMouse] = useState({
    pressed: false,
    intents:0,
    position:null
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [levelData, setLevelData] = useState(null)
  const [levelImg, setLevelImg] = useState(null)
  const [characters, setCharacters] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(null)
  const [levelDimensions, setLevelDimensions] = useState(null)

  const levelBackendUrl = enviroment.getBackEnd() + "level/" +levelId

  const calculateDifTimeWithStart = (time) =>{
    return Math.abs(time - startTime);
  }

  useEffect(() =>{

    const fetchImage = async(imgUrl) =>{
      const res = await fetch(imgUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      return imageObjectURL
    }
    const getData = async () =>{
      const levelBackendUrl = enviroment.getBackEnd() + "level/" +levelId
      try{
        const response = await fetch(levelBackendUrl)
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const actualData = await response.json();
        console.log(actualData.level);
        setLevelData({
          _id:actualData.level._id,
          name:actualData.level.name,
          highscore: actualData.level.highscore,
        })
        const levelIMageURl = await fetchImage(actualData.level.img)
        setLevelImg(levelIMageURl)
        setLevelDimensions({width:actualData.level.imgWidth, height: actualData.level.imgHeight})
        const charactersWIthFetchedImages = await Promise.all(
          actualData.level.characters.map(async (character) => {
            const chararcterImgUrl = await fetchImage(character.img)
            return {...character, img:chararcterImgUrl, founded:false}
          })
        )
        setCharacters(charactersWIthFetchedImages)
      }
      catch(err){
        console.log(err.message)
        setError(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    getData()
  },[levelId])

  useEffect( () =>{
    setInterval(() => {
      setCurrentTime(new Date())
    },1000)
  })

  const setCharacterFounded = (characterId, newFoundedValue) =>{
    if(characters === null) return 
    const newCharacters = characters.map(character => {
      if(characterId === character.id) return {...character, founded:newFoundedValue}
      return character
    })
    setCharacters(newCharacters)
    const isFinished = newCharacters.every(character => character.founded)
    setFinished(isFinished)
    setScore(currentTime)
  }

  const createGame = () =>{
    return (
      <Backend.Provider value ={{url:levelBackendUrl, characters:characters}}>  
          <div className={styles.level}>
            <div onClick={(e) => {e.preventDefault();setMouse({...mouse, pressed:false})}}>
               <Header
                  clickCount={mouse.intents}
                  time={
                    finished ? -1 : calculateDifTimeWithStart(currentTime)
                    }>
                </Header>
            </div>
              <Gameboard
                levelData ={levelData}
                levelImg={levelImg}
                mouse={mouse}
                setMouse={setMouse}
                setCharacterFounded={setCharacterFounded}
                levelDimensions= {levelDimensions}>
              </Gameboard>
             {finished && <EndGamePanel score={calculateDifTimeWithStart(score)}></EndGamePanel>}
             <Footer></Footer>
          </div>
      </Backend.Provider>
      )
  }

  if(error === null){
    return (<>
      {loading
        ?<h2>Loading</h2>
        :createGame()
      }
    </>
    )
  }else{
    return <ErrorPage></ErrorPage>
  }
}

export default Level