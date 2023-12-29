import { useEffect } from "react"

import { toast } from "react-toastify"

import { socket } from "../../../common/socket"
import { useRoomRefs } from "../../../pages/room/hooks/useRoomRefs"

const useChat = () => {
  const { userNameRef, setMessages, } = useRoomRefs()

  useEffect(() => {
    socket.on("newMessage", (message, displayName) => {
      setMessages((messages) => [...messages, {message: message, displayName: displayName}])
    })

    return () => {
      socket.off("newMessage")
    }
  })

  const submitMessage = (message) => {
    socket.emit("message", message, ({success, message: errorMessage}) => {
      if (!success) {
        toast(errorMessage, {type: "error"})
      } else {
        setMessages((messages) => [...messages, {message: message, displayName: userNameRef.current}])
      }
    })
  }

  return {
    submitMessage
  }
}

export default useChat