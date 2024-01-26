import { useState, useContext } from "react"
import styles from "./end-game-panel.module.css"
import { Backend } from "../Level/Level"
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';



const MINUTE_IN_MS = 60000

const Form = ({handleSubmit, submiting, setName, name}) =>{

  return (<> 
    <form onSubmit={(e) => handleSubmit(e)}>
       <label htmlFor="name">Name</label>
       <input type="text"  name="name" id="name" value={name} onChange={(e) => {e.preventDefault() ; setName(e.target.value)}}/>
       {submiting
         ?<button disabled>Send Score!</button>
         :<button>Send Score!</button> 
       }
    </form>
  </>)
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submiting: PropTypes.bool.isRequired,
  setName: PropTypes.func.isRequired,
  name:PropTypes.string,
}

const SubmitedButtons = () =>{
  
  const {levelId} = useParams()

  const url = "/level/"+ levelId + "/highscore"

  return(
    <>
      <Link to="/"> 
        Go back
      </Link>
      <Link to = {url}>
        See Highscores
      </Link>
    </>
  )
  
}


const EndGamePanel = ({score}) => {
  const [name, setName] = useState('Anonimus')
  const [submiting, setSubmiting] = useState(false)
  const [submited, setSubmited] = useState(false)
  const [error, setError] = useState(null)


  const {url} = useContext(Backend)

  const minutes = Math.floor(score/ MINUTE_IN_MS)
  const seconds = Math.floor((score/1000) % 60)
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(name);
    setSubmiting(true)
    try{
      const response = await fetch(url+ "/highscores",{
        method:"post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:name,
          score:score,
        })
      })
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      setSubmited(true)
    }catch(error){
      setError(error.message)
      console.log(error.message);
    }
    finally{
      setSubmiting(false)
    }
  }

  return (
    <div className={styles.displayer}>
        <h2>YOU WON!</h2>
        <p>Score {minutes}:{(seconds<10?"0":"")+seconds}</p>
        {submited && error === null
          ?<SubmitedButtons></SubmitedButtons>
          :<Form handleSubmit={handleSubmit} submiting={submiting} setName={setName} name={name}></Form>  
        }
    </div>
  )
}

EndGamePanel.propTypes = {
  score: PropTypes.number
}

export default EndGamePanel