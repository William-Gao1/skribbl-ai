import { useState, useEffect, useRef } from "react"

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoMdSend } from "react-icons/io";

import useChat from "./hooks/useChat"
import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"
import Button from "react-bootstrap/esm/Button";

import "./Chat.css"

const Chat = () => {
  const [messageDraft, setMessageDraft] = useState("")
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);
  const prevInnerDivHeight = useRef(null);

  const { messages } = useRoomRefs()
  const { submitMessage } = useChat()

  const sendMessage = (e) => {
    e.preventDefault()
    submitMessage(messageDraft)
    setMessageDraft("")
  }

  useEffect(() => {
    const outerHeight = outerDiv.current.clientHeight;
    const innerHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerHeight - outerHeight,
        left: 0,
        behavior: "smooth"
      })
    }
    prevInnerDivHeight.current = innerHeight;
  }, [messages]);

  return (
    <div 
      className="chatContainer"
      style={{
        position: "relative",
        height: "100%"
      }}
    >
      {/* Message chat history */}
      <div className="chatLog" ref={outerDiv}>
        <div ref={innerDiv}>
          {messages.map(({message, displayName}, index) => (
            <div key={index} className={`${index % 2 === 0 ? 'even' : 'odd'}Chat`}>
              {displayName ? `${displayName}: ${message}` : <b>{message}</b>} 
            </div>
          ))}
        </div>
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