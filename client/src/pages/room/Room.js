import DrawingArea from "../../components/DrawingArea/DrawingArea"
import WordGuessDisplay from "../../components/WordGuessDisplay.js/WordGuessDisplay"
import Chat from "../../components/Chat/Chat"
import PlayerList from "../../components/PlayerList/PlayerList"

import { socket } from "../../common/socket"
import { useRoomRefs } from "./hooks/useRoomRefs"
import useRoomControls from "./hooks/useRoomControls"

const Room = () => {
  const { roomCodeRef, roomOwner, isGameStartedRef } = useRoomRefs()

  const { leaveRoom, startGame, skipWord } = useRoomControls()
  return (
    <>
      <button onClick={leaveRoom}>Leave Room</button>
      {(!isGameStartedRef.current && roomOwner.id === socket.id) ? <button onClick={startGame}>Start</button> : null}
      <h3>Room Code: {roomCodeRef.current}</h3>

      <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: "3em"}}>
        <PlayerList />
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <WordGuessDisplay skipWord={skipWord}/>
          <DrawingArea />
        </div>
        <Chat />
      </div>
    </>
  )
}

export default Room