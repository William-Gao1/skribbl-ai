import { useEffect, useState } from 'react'

import Markdown from 'react-markdown'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsQuestionCircle } from "react-icons/bs";

import instructionsMd from "./instructions.md"
import LinkRenderer from '../Link';

import "./HowToPlay.css"

const HowToPlay = () => {
  const [isOpen, setOpen] = useState(false)
  const [instructions, setIntructions] = useState("")

  useEffect(() => {
    fetch(instructionsMd).then((response) => response.text()).then((text) => setIntructions(text))
  })

  return (
    <>
      <Modal 
        show={isOpen} 
        onHide={() => setOpen(false)}
        contentClassName="instructionModalContent"
        className="instructionModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>How To Play Skribbl.ai</Modal.Title>
        </Modal.Header>
        
        <Markdown components={{ a: LinkRenderer }} className="instructions">{instructions}</Markdown>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="howToPlayButton" onClick={() => setOpen(true)}>How to Play &nbsp;<BsQuestionCircle size={25}/></Button>
    </>
  )
}

export default HowToPlay