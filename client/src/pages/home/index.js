import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LiaRedoAltSolid } from "react-icons/lia";

import { generate } from 'silly-animal';

import useHomeControls from './hooks/useHomeControls';
import { useRoomRefs } from '../room/hooks/useRoomRefs';
import JoinRoomModal from '../../components/JoinRoomModal';
import CreateRoomModal from '../../components/CreateRoomModal';
import Logo from '../../components/Logo';
import GitHubDropdown from '../../components/GithubDropdown';

import "./Home.css"
import Info from '../../components/Info';
import HowToPlay from '../../components/HowToPlay';

const Home = () => {
  const { userNameRef } = useRoomRefs()
  const { createRoom, joinRoom } = useHomeControls()

  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false)
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false)
  const [userNameDraft, setUserNameDraft] = useState(userNameRef.current || generate('-'))
  
  const joinRoomHandler = (roomCode) => {
    joinRoom(
      userNameDraft,
      roomCode,
      (success) => {if (success) setJoinRoomModalOpen(false)})
  }

  const createRoomHandler = (model, difficulty) => {
    createRoom(userNameDraft, model, difficulty)
  }
  return (
    <div className="homeContainer">
      <JoinRoomModal show={joinRoomModalOpen} handleClose={() => setJoinRoomModalOpen(false)} joinRoom={joinRoomHandler}/>
      <CreateRoomModal show={createRoomModalOpen} handleClose={() => setCreateRoomModalOpen(false)} createRoom={createRoomHandler}/>
      <HowToPlay />
      <div className="logoControlsContainer">
        <Logo />
        <div className="homeControlsContainer">
          <InputGroup>
            <Form.Control
              className="userNameInput"
              placeholder="Enter your name"
              value={userNameDraft}
              onChange={(e) => setUserNameDraft(e.target.value)}
              aria-describedby="regenerateUsernameButton"
            />
            <Button id="regenerateUsernameButton" onClick={() => setUserNameDraft(generate('-'))}>
              <LiaRedoAltSolid />
            </Button>
          </InputGroup>
          <InputGroup className="homeActionsButtonGroup">
            <Button onClick={() => setCreateRoomModalOpen(true)} className="createRoomButton">
              Create Room
            </Button>
          </InputGroup>

          <InputGroup className="homeActionsButtonGroup">
            <Button onClick={() => setJoinRoomModalOpen(true)} className="joinRoomButton">
              Join Room
            </Button>
          </InputGroup>
          <InputGroup className="homeActionsButtonGroup">
            <GitHubDropdown />
            <Info />
          </InputGroup>
        </div>
      </div>
    </div>
  )
}

export default Home