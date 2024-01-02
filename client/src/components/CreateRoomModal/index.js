import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './CreateRoomModal.css'

const CreateRoomModal = ({show, handleClose, createRoom}) => {
  const [modelSelection, setModelSelection] = useState('cnn');
  const [difficultySelection, setDifficultySelection] = useState('easy');


  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Room</Modal.Title>
        </Modal.Header>
        <div className="createModalBody">
          <div className="selectModelForm">
            <b className="selectModelText">Select Model:</b>
            <ButtonGroup className="modelSelection">
              <ToggleButton
                  className="modelSelectButton"
                  type="radio"
                  variant="secondary"
                  checked={"cnn" === modelSelection}
                  onClick={() => setModelSelection("cnn")}
                >
                  CNN
                </ToggleButton>
                <ToggleButton
                  className="modelSelectButton"
                  type="radio"
                  variant="secondary"
                  checked={"rnn" === modelSelection}
                  onClick={() => setModelSelection("rnn")}
                >
                  RNN
                </ToggleButton>
            </ButtonGroup>
          </div>
          
          <div className="selectDifficultyForm">
            <b className="selectDifficultyText">Select Difficulty:</b>
            <ButtonGroup className="difficultySelection">
              <ToggleButton
                  className="difficultySelectButton"
                  type="radio"
                  variant="secondary"
                  checked={"easy" === difficultySelection}
                  onClick={() => setDifficultySelection("easy")}
                >
                  Easy
                </ToggleButton>
                <ToggleButton
                  className="difficultySelectButton"
                  type="radio"
                  variant="secondary"
                  checked={"medium" === difficultySelection}
                  onClick={() => setDifficultySelection("medium")}
                >
                  Medium
                </ToggleButton>
                <ToggleButton
                  className="difficultySelectButton"
                  type="radio"
                  variant="secondary"
                  checked={"hard" === difficultySelection}
                  onClick={() => setDifficultySelection("hard")}
                >
                  Hard
                </ToggleButton>
            </ButtonGroup>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createRoom(modelSelection, difficultySelection)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default CreateRoomModal