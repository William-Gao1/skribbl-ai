import { useState } from "react"

import useChat from "./hooks/useChat"
import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"

const CHAT_SIZE = {width: 300, height: 700}

const Chat = () => {
  const [messageDraft, setMessageDraft] = useState("")
  
  const { messages } = useRoomRefs()
  const { submitMessage } = useChat()
  return (
    <div style={{display: "flex", flexDirection: "column", marginRight: "auto"}}>

      {/* Message chat history */}
      <div style={{border: "solid", width: CHAT_SIZE.width, height: CHAT_SIZE.height, wordWrap: "break-word", overflow: "scroll"}}>
        {messages.map(({message, displayName}, index) => <div key={index}>{displayName ? `${displayName}: ${message}` : <b>{message}</b>} </div>)}
      </div>

      {/* Send message input box */}
      <form onSubmit={(e) => {
        e.preventDefault()
        submitMessage(messageDraft)
        setMessageDraft("")
      }} >
        <input 
          style={{margin: "1em 0", height: 30, width: CHAT_SIZE.width}} 
          onChange={(e) => setMessageDraft(e.target.value)} 
          value={messageDraft}
        />
        <input type="submit" hidden />
      </form>
    </div>
  )
}

export default Chat