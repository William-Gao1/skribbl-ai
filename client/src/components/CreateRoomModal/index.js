import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './CreateRoomModal.css'

const CreateRoomModal = ({show, handleClose, createRoom}) => {
  const [modelSelection, setModelSelection] = useState('rnn');
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
                  className={"rnn" === modelSelection ? "activeModelSelectButton" : "modelSelectButton"}
                  type="radio"
                  checked={"rnn" === modelSelection}
                  onClick={() => setModelSelection("rnn")}
                >
                LSTM
              </ToggleButton>
              <ToggleButton
                  className={"cnn" === modelSelection ? "activeModelSelectButton" : "modelSelectButton"}
                  type="radio"
                  checked={"cnn" === modelSelection}
                  onClick={() => setModelSelection("cnn")}
                >
                  CNN
                </ToggleButton>
            </ButtonGroup>
          </div>
          
          <div className="selectDifficultyForm">
            <b className="selectDifficultyText">Select Difficulty:</b>
            <ButtonGroup className="difficultySelection">
              <ToggleButton
                  className={"easy" === difficultySelection ? "activeDifficultySelectButton" : "difficultySelectButton"}
                  type="radio"
                  checked={"easy" === difficultySelection}
                  onClick={() => setDifficultySelection("easy")}
                >
                  Easy
                </ToggleButton>
                <ToggleButton
                  className={"medium" === difficultySelection ? "activeDifficultySelectButton" : "difficultySelectButton"}
                  type="radio"
                  checked={"medium" === difficultySelection}
                  onClick={() => setDifficultySelection("medium")}
                >
                  Medium
                </ToggleButton>
                <ToggleButton
                  className={"hard" === difficultySelection ? "activeDifficultySelectButton" : "difficultySelectButton"}
                  type="radio"
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