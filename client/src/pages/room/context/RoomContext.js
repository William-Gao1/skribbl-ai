import { createContext, useRef, useState } from "react"

export const roomContext = createContext(null)

const RoomContextProvider = ({children}) => {
  const canvasRef = useRef(null)
  const userNameRef = useRef("")
  const [players, setPlayers] = useState([])
  const [inRoom, setInRoom] = useState(false)
  const roomCodeRef = useRef("")
  const [roomOwner, setRoomOwner] = useState(null)
  const isYourTurnRef = useRef(false)
  const currentDrawerIndexRef = useRef(null)
  const [word, setWord] = useState({numLetters: 0})
  const isGameStartedRef = useRef(false)
  const [messages, setMessages] = useState([])


  return (
    <roomContext.Provider
      value={{
        canvasRef,
        userNameRef,
        players,
        setPlayers,
        inRoom,
        setInRoom,
        roomCodeRef,
        roomOwner,
        setRoomOwner,
        isYourTurnRef,
        currentDrawerIndexRef,
        word,
        setWord,
        isGameStartedRef,
        messages,
        setMessages
      }}
    >
      {children}
    </roomContext.Provider>
  )
}

export default RoomContextProvider