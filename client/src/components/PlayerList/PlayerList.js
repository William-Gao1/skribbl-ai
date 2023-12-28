import { useRoomRefs } from "../../pages/room/hooks/useRoomRefs"

const PLAYER_LIST_SIZE = {width: 200, height: 750}

const PlayerList = () => {
  const { players, userNameRef } = useRoomRefs()
  return (
    <div style={{
      border: "solid", 
      marginBottom: "0.9em", 
      minWidth: PLAYER_LIST_SIZE.width, 
      height: PLAYER_LIST_SIZE.height, 
      wordWrap: "break-word", 
      marginLeft:"auto"}}
    >
      {players.map(({id, displayName}) => userNameRef.current === displayName ? (
        <div key={id}><b>{displayName}</b></div>
        ) : ( 
        <div key={id}>{displayName}</div>
        )
      )}
    </div>
  )
}

export default PlayerList