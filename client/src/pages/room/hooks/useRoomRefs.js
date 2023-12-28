import { useContext } from "react";

import { roomContext } from "../context/RoomContext";

export const useRoomRefs = () => {
  const { 
    canvasRef,
    userNameRef, 
    players,
    setPlayers,
    inRoom,
    setInRoom,
    roomCodeRef,
    roomOwner,
    setRoomOwner,
    currentDrawerIndexRef,
    isYourTurnRef,
    word,
    setWord,
    isGameStartedRef,
    messages,
    setMessages
  } = useContext(roomContext)

  return {
    canvasRef,
    userNameRef, 
    players,
    setPlayers,
    inRoom,
    setInRoom,
    roomCodeRef,
    roomOwner,
    setRoomOwner,
    currentDrawerIndexRef,
    isYourTurnRef,
    word,
    setWord,
    isGameStartedRef,
    messages,
    setMessages
  }
}