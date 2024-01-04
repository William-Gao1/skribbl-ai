import { useState, useEffect } from 'react'

import Markdown from 'react-markdown'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { IoInformationCircleOutline } from "react-icons/io5";

import infoMd from "./info.md"
import LinkRenderer from '../Link';

import "./Info.css"

const Info = () => {
  const [isOpen, setOpen] = useState(false)
  const [info, setInfo] = useState("")

  useEffect(() => {
    fetch(infoMd).then((response) => response.text()).then((text) => setInfo(text))
  })

  return (
    <>
      <Modal 
        show={isOpen}
        onHide={() => setOpen(false)}
        contentClassName="infoModalContent"
        className="infoModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Info and Technical Details</Modal.Title>
        </Modal.Header>

        <Markdown components={{ a: LinkRenderer}} className="instructions">{info}</Markdown>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ButtonGroup>
        <Button className="infoButton" onClick={() => setOpen(true)}>Info <IoInformationCircleOutline size={27}/></Button>
      </ButtonGroup>
    </>
  )
}

export default Info