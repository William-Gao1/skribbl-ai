import { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/home";
import Room from "./pages/room";

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
    <div style={{height: "100%"}}>

    <ToastContainer autoClose={2000} style={{marginTop: inRoom ? "4.8em": "0"}}/>
      {inRoom ? <Room /> : <Home />}
    </div>
      
  )
} 

export default App;
