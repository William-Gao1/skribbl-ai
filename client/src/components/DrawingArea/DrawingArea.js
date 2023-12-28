import { motion } from 'framer-motion';

import { useRoomRefs } from '../../pages/room/hooks/useRoomRefs';
import { useDraw } from './hooks/useDraw';

const CANVAS_SIZE = {width: 750, height: 750}

const DrawingArea = () => {
  const { canvasRef, isYourTurnRef } = useRoomRefs()
  const { handleStartStroke, handleEndStroke, handleMouseMove, handleUndo } = useDraw()
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <motion.canvas
        ref={canvasRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onMouseDown={handleStartStroke}
        onMouseUp={handleEndStroke}
        onMouseMove={handleMouseMove}
        style={{borderStyle: "solid", margin: "0 3em"}}
      />
      {isYourTurnRef.current ? <button style={{marginTop: 10, width: 100}} onClick={handleUndo}>Undo</button> : null}
    </div>
    
  )
}

export default DrawingArea