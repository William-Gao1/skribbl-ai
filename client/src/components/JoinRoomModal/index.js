import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './JoinRoomModal.css'

const JoinRoomModal = ({show, handleClose, joinRoom}) => {
  const [roomCodeDraft, setRoomCodeDraft] = useState("")

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Join Room</Modal.Title>
        </Modal.Header>
        <InputGroup className="modalBody">
          <InputGroup.Text id="username-label">Room code:</InputGroup.Text>
          <Form.Control
            className="roomCodeInput"
            placeholder="Enter the room code"
            value={roomCodeDraft}
            onChange={(e) => setRoomCodeDraft(e.target.value)}
            aria-describedby="username-label"
          />
        </InputGroup>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => joinRoom(roomCodeDraft)}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default JoinRoomModal