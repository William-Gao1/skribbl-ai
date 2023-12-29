import Button from "react-bootstrap/Button"

import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"

import "./WordGuessDisplay.css"

const generateWordBlanks = (number, spaceLocations) => {
  const wordBlanks = []
  for (let i = 0; i < number; i++) {
    if (spaceLocations.includes(i)) {
      wordBlanks.push(<span className="wordDisplay" key={i}>&ensp;&nbsp;</span>)
    } else {
      wordBlanks.push(<span className="wordDisplay" key={i}>_ </span>)
    }
  }

  return wordBlanks
}

const WordGuessDisplay = ({skipWord}) => {
  const { word } = useRoomRefs()
  
  if (word.numLetters === 0) {
    return null
  }
  
  return (
    <div className="wordGuessDisplayContainer" style={{marginTop: word.word ? "-8em" : "-5.75em"}}>
      <div>
        { word.word ? <span className="wordDisplay">{word.word}</span> : generateWordBlanks(word.numLetters, word.spaceLocations)}
      </div>
      { word.word ? <Button onClick={skipWord}>Skip Word</Button> : null}
    </div>
  )
}

export default WordGuessDisplay