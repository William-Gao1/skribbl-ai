import { toast } from "react-toastify"

import { socket } from "../../../common/socket"
import { useRoomRefs } from "../../room/hooks/useRoomRefs"

const useHomeControls = () => {
  const { 
    userNameRef, 
    setPlayers, 
    setInRoom, 
    roomCodeRef,
    setRoomOwner,
    isYourTurnRef,
    currentDrawerIndexRef,
    setWord,
    isGameStartedRef,
    setMessages
  } = useRoomRefs()

  const handleRoomResponse = (success, message, room, submitUserName) => {
    if (success === true) {
      toast(message, {type: "success"})
      userNameRef.current = submitUserName
      roomCodeRef.current = room.roomCode
      isYourTurnRef.current = false
      currentDrawerIndexRef.current = room.drawingMemberIndex
      isGameStartedRef.current = room.started
      setRoomOwner(room.owner)
      setMessages([])
      setWord({numLetters: room.numLetters, spaceLocations: room.spaceIndices})
      setPlayers(room.members)
      setInRoom(true)
    } else {
      toast(message, {type: "error"})
    }
  }
  const joinRoom = (submitUserName, submitRoomCode, callback) => {
    socket.emit("joinRoom", submitRoomCode, submitUserName, ({success, message, room}) => {
      handleRoomResponse(success, message, room, submitUserName)
      callback(success)
    })
  }

  const createRoom = (submitUserName) => {
    socket.emit("createRoom", submitUserName, ({success, message, room}) => {
      handleRoomResponse(success, message, room, submitUserName)
    })
  }

  return {
    createRoom,
    joinRoom
  }
}

export default useHomeControls