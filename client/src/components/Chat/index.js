import { useState } from "react"

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoMdSend } from "react-icons/io";

import useChat from "./hooks/useChat"
import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"
import Button from "react-bootstrap/esm/Button";

import "./Chat.css"

const Chat = () => {
  const [messageDraft, setMessageDraft] = useState("")
  
  const { messages } = useRoomRefs()
  const { submitMessage } = useChat()

  const sendMessage = (e) => {
    e.preventDefault()
    submitMessage(messageDraft)
    setMessageDraft("")
  }

  return (
    <div className="chatContainer">
      {/* Message chat history */}
      <div className="chatLog">
        {messages.map(({message, displayName}, index) => (
          <div key={index} className={`${index % 2 === 0 ? 'even' : 'odd'}Chat`}>
            {displayName ? `${displayName}: ${message}` : <b>{message}</b>} 
          </div>
        ))}
      </div>

      {/* Send message input box */}
      <Form onSubmit={sendMessage}>
        <InputGroup className="submitChatMessage">
          <Form.Control 
            onChange={(e) => setMessageDraft(e.target.value)} 
            value={messageDraft}
            placeholder="Type your guess here"
            aria-describedby="send-button"
          />
          <Button id="send-button" onClick={sendMessage}>
            <IoMdSend/>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default Chat