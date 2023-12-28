import { useEffect } from "react"

import { toast } from "react-toastify"

import { socket } from "../../../common/socket"
import { useRoomRefs } from "./useRoomRefs"
import { useCtx } from "../../../components/DrawingArea/hooks/useCtx"

const useRoomControls = () => {
  const { 
    setInRoom, 
    currentDrawerIndexRef, 
    isYourTurnRef, 
    setWord, 
    isGameStartedRef, 
    setPlayers, 
    players,
    canvasRef,
    setRoomOwner 
  } = useRoomRefs()
  const ctx = useCtx()
  useEffect(() => {
    const updateCurrentDrawer = (newDrawerIndex, numLetters, word, spaceLocations, isYourTurn) => {
      isYourTurnRef.current = isYourTurn
      currentDrawerIndexRef.current = newDrawerIndex
      isGameStartedRef.current = true
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      setWord({numLetters, word, spaceLocations})
      if (players[newDrawerIndex].id !== socket.id) {
        toast(`It is ${players[newDrawerIndex].displayName}'s turn to draw`, {type: "info", toastId: `${players[newDrawerIndex].displayName}:draw`})
      } else {
        toast("It is your turn to draw", {type: "info", toastId: "draw"})
      }
    }
    socket.on("yourTurn", (playerIndex, numLetters, word, spaceLocations) => {
      updateCurrentDrawer(playerIndex, numLetters, word, spaceLocations, true)
    })

    socket.on("gameStarted", () => {
      toast("Game started")
    })

    socket.on("newRound", (drawingPlayerIndex, numLetters, spaceLocations) => {
      updateCurrentDrawer(drawingPlayerIndex, numLetters, null, spaceLocations, false)
    })

    socket.on("newPlayer", (players, message) => {
      toast(message, {type: 'info', toastId: message})
      setPlayers(players)
    })

    socket.on("playerLeft", (updatedPlayerList, message, newDrawingPlayerIndex) => {
      toast(message, {type: 'warning', toastId: message})
      currentDrawerIndexRef.current = newDrawingPlayerIndex
      setPlayers(updatedPlayerList)
    })

    socket.on("newOwner", (owner) => {
      setRoomOwner(owner)
      if (owner.id === socket.id) {
        toast("You are now the owner of the room", {type: 'info', toastId: "owner"})
      }
    })

    socket.on("kicked", (message) => {
      toast(message, {type: "info"})
      isGameStartedRef.current = false
      setInRoom(false)
    })

    return () => {
      socket.off("yourTurn")
      socket.off("gameStarted")
      socket.off("newPlayer")
      socket.off("playerLeft")
      socket.off("roundEnd")
      socket.off("newRound")
      socket.off("kicked")
    }
  })

  const startGame = () => {
    socket.emit("startGame", ({success, message}) => {
      if (!success) {
        toast(message, {type: "error"})
      } else {
        toast("Game started")
      }
    })
  }

  const leaveRoom = () => {
    socket.emit("leaveRoom")
    toast("Left room", {type: "success"})
    isGameStartedRef.current = false
    setInRoom(false)
  }

  const skipWord = () => {
    socket.emit("skipWord")
  }

  return {
    leaveRoom,
    startGame,
    skipWord
  }
}

export default useRoomControls