import { useEffect, useRef } from "react"

import { toast } from "react-toastify"

import { socket } from "../../../common/socket"
import { useRoomRefs } from "../../../pages/room/hooks/useRoomRefs"

const useChat = () => {
  const { userNameRef, setMessages, messages} = useRoomRefs()
  const outerDiv = useRef(null)
  const innerDiv = useRef(null)
  const prevInnerDivHeight = useRef(null);
  const dummyDiv = useRef(null)

  const isUserScrolledToEnd = () => {
    const outerHeight = outerDiv.current.clientHeight;
    const innerHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    const result = !prevInnerDivHeight.current ||
      prevInnerDivHeight.current < outerHeight ||
      outerDivScrollTop > prevInnerDivHeight.current - outerHeight - 50

    prevInnerDivHeight.current = innerHeight;
    return result
  }

  const scrollDown = () => {
    dummyDiv.current.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    socket.on("newMessage", (message, displayName) => {
      prevInnerDivHeight.current = innerDiv.current.clientHeight;
      setMessages((messages) => [...messages, {message: message, displayName: displayName}])
    })

    return () => {
      socket.off("newMessage")
    }
  })

  useEffect(() => {
    if (isUserScrolledToEnd()) {
      scrollDown()
    }
  }, [messages])

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
    submitMessage,
    outerDiv,
    innerDiv,
    dummyDiv
  }
}

export default useChat