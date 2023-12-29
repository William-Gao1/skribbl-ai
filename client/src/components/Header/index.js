import { toast } from "react-toastify"
import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"
import Logo from "../Logo"

import "./Header.css"

const Header = ({actions}) => {
  const { roomCodeRef } = useRoomRefs()
  return (
    <div className="headerContainer">
      <span className="roomCodeDisplay" onClick={() => {
          navigator.clipboard.writeText(roomCodeRef.current)
          toast("Copied!", {type: "success", toastId: "copyCode"})
        }}
      >
        Room Code: {roomCodeRef.current}
      </span>
      <div className="headerLogo">
        <Logo fontSize={50} />
      </div>
      {actions}
    </div>
  )
}

export default Header