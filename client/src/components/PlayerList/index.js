import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"

import './PlayerList.css'

const PlayerList = () => {
  const { players, userNameRef } = useRoomRefs()
  return (
    <div className="playerList">
      {players.map(({id, displayName}, index) => (
        <div key={id} className={index % 2 === 0 ? "evenPlayer" : "oddPlayer"}>
          <b className={userNameRef.current === displayName ? "youPlayer" : ""}>
            {userNameRef.current === displayName ? `${displayName} (You)` : displayName}
          </b>
        </div>
      ))}
    </div>
  )
}

export default PlayerList