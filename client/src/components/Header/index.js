import { toast } from "react-toastify"
import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"
import Logo from "../Logo"

import "./Header.css"

const Header = ({actions}) => {
  const { roomCodeRef } = useRoomRefs()
  const buttons = actions.props.children
  return (
    <div className="headerContainer">
      <span className="roomCodeDisplay" onClick={() => {
          navigator.clipboard.writeText(roomCodeRef.current)
          toast("Copied!", {type: "success", toastId: "copyCode"})
        }}
      >
        Room Code: {roomCodeRef.current}
      </span>
      <div 
      className="headerLogo" 
      style={{
        transform: buttons.length > 1 && buttons[1] ? "translate(-80%, 0)": "translate(-240%, 0)"
      }}>
        <Logo fontSize={50} />
      </div>
      {actions}
    </div>
  )
}

export default Header