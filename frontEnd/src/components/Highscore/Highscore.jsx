import { useEffect, useState } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import styles from "./highscore.module.css"
import { useParams } from "react-router-dom"
import ErrorPage from "../ErrorPage/ErrorPage"
import enviroment from "../../enviroment"
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const MINUTE_IN_MS = 60000

const HighscoreDisplayer = ({highscores}) =>{

  const highscoreWithId = highscores.map(highscore => { return {...highscore, id:uuidv4()} })

  const highscoresSorted = highscoreWithId.sort((a , b) => a.score - b.score)
 
  const bestHighscores = highscoresSorted.slice(0,10)

  const getParsedScore = (score) => {
    const minutes = Math.floor(score/ MINUTE_IN_MS)
    const seconds = Math.floor((score/1000) % 60)
    return `${minutes} : ${(seconds < 10 ? "0" : "") + seconds}`
  } 
  return (
    <div className={styles.highscoresConteiner}>
      <h2> Highscores </h2>
      <ul className={styles.highscores}>
        {bestHighscores.map( highscore => 
        <li key={highscore.id} className={styles.highscore}>
            <p>{highscore.name}</p>
            <p>{getParsedScore(highscore.score)}</p>
        </li>)}
      </ul>
    </div>
  )

}

HighscoreDisplayer.propTypes = {
  highscores: PropTypes.arrayOf(PropTypes.shape({
    name:PropTypes.string,
    score: PropTypes.number
  }))
}


const Highscore = () => {

  const [highscores, setHighscores] = useState(null) 
  const [loading, setLoading] = useState(true)
  
  const {levelId} = useParams()

  useEffect(() =>{
    const getHighscores = async () => {

      const url = enviroment.getBackEnd() + "/level/" + levelId + "/highscores"
      try{
        const response = await fetch(url)

        if(!response.ok){
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }
      const responseData = await response.json()
      setHighscores(responseData.highscores.highscores)
      console.log(responseData.highscores.highscores);
      }
      catch(error){
        console.log(error.message);
        <ErrorPage></ErrorPage>
      }
      finally{
        setLoading(false)
      }
    }
    getHighscores()
  },[levelId])
  return (
    <div className={styles.layout}>
      <Header></Header>
      <div className={styles.main}>
        {loading
          ? <p>Loading...</p>
          : <HighscoreDisplayer highscores={highscores}></HighscoreDisplayer>
        }
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Highscore