import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import DrawingArea from "../../components/DrawingArea/index.js"
import WordGuessDisplay from "../../components/WordGuessDisplay.js"
import Chat from "../../components/Chat/index.js"
import PlayerList from "../../components/PlayerList/index.js"
import Header from "../../components/Header/index.js";

import { socket } from "../../common/socket"
import { useRoomRefs } from "./hooks/useRoomRefs"
import useRoomControls from "./hooks/useRoomControls"

import "./Room.css"

const Room = () => {
  const { roomOwner, isGameStartedRef } = useRoomRefs()

  const { leaveRoom, startGame, skipWord } = useRoomControls()
  return (
    <>
      <Header actions={(
        <ButtonGroup size="lg">
          <Button onClick={leaveRoom} className="leaveRoomButton">Leave Room</Button>
          {(!isGameStartedRef.current && roomOwner.id === socket.id) ? <Button onClick={startGame} className="startButton">Start</Button> : null}
        </ButtonGroup>
      )}/>
      <div
        className="gameContainer" 
        style={{marginTop: isGameStartedRef.current ? "8em" : "3em"}}
      >
        <PlayerList />
        <div className="drawingContainer">
          <WordGuessDisplay skipWord={skipWord}/>
          <DrawingArea />
        </div>
        <Chat />
      </div>
    </>
  )
}

export default Room