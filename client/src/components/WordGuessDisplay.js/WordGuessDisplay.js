import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"

const generateWordBlanks = (number, spaceLocations) => {
  const wordBlanks = []
  for (let i = 0; i < number; i++) {
    if (spaceLocations.includes(i)) {
      wordBlanks.push(<span style={{fontSize: 50}} key={i}>&ensp;&nbsp;</span>)
    } else {
      wordBlanks.push(<span style={{fontSize: 50}} key={i}>_ </span>)
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
    <div style={{display: "flex", flexDirection: "column", marginTop: word.word ? "-6em" : "-4.6em", marginBottom: "1em"}}>
      <div>
        { word.word ? <span style={{fontSize: 50}}>{word.word}</span> : generateWordBlanks(word.numLetters, word.spaceLocations)}
      </div>
      { word.word ? <button onClick={skipWord}>Skip Word</button> : null}
    </div>
  )
}

export default WordGuessDisplay