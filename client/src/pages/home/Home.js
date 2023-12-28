import { useState } from 'react';

import Modal from 'react-modal';
import { generate } from 'silly-animal';

import useHomeControls from './hooks/useHomeControls';
import { useRoomRefs } from '../room/hooks/useRoomRefs';

const Home = () => {
  const { userNameRef } = useRoomRefs()
  const { createRoom, joinRoom } = useHomeControls()

  const [joinRoomModalOpen, setJoinRoomModalOpen] = useState(false)
  const [userNameDraft, setUserNameDraft] = useState(userNameRef.current || generate('-'))
  const [roomCodeDraft, setRoomCodeDraft] = useState("")

  return (
    <>
      <Modal 
        isOpen={joinRoomModalOpen}
        onRequestClose={() => setJoinRoomModalOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        ariaHideApp={false}
      >
        <p>Room Code</p>
        <input onChange={(e) => setRoomCodeDraft(e.target.value)} value={roomCodeDraft}/>
        <button onClick={() => joinRoom(userNameDraft, roomCodeDraft)}>Join</button>
        <button onClick={() => setJoinRoomModalOpen(false)}>Close</button>
      </Modal>
      <button onClick={() => createRoom(userNameDraft)}>Create Room</button>
      <button onClick={() => setJoinRoomModalOpen(true)}>Join Room</button>
      <div>
        <span>Username: </span>
        <input value={userNameDraft} onChange={(e) => setUserNameDraft(e.target.value)}/>
      </div>
    </>
  )
}

export default Home