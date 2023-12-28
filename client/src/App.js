import { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home/Home";
import Room from "./pages/room/Room";

import { socket } from "./common/socket"
import { useRoomRefs } from "./pages/room/hooks/useRoomRefs";

function App() {
  const { inRoom, setInRoom, isGameStartedRef } = useRoomRefs()
  useEffect(() => {
    socket.on("reconnect", () => {
      toast("Reconnected", {type: "success"})
    })

    socket.on("disconnect", (reason) => {
      isGameStartedRef.current = false
      setInRoom(false)
      toast(`Disconnected from server: ${reason}`, {type: "error", toastId: "disconnect"})
    })
  })

  window.addEventListener('beforeunload', () => {
    socket.disconnect()
  })

  return (
    <div>
      <ToastContainer autoClose={2000}/>
      {inRoom ? <Room /> : <Home />}
    </div>
      
  )
} 

export default App;
