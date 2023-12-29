import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';

import { useRoomRefs } from '../../pages/room/hooks/useRoomRefs';
import { useDraw } from './hooks/useDraw';

import './DrawingArea.css'

const CANVAS_SIZE = {width: 550, height: 550}

const DrawingArea = () => {
  const { canvasRef, isYourTurnRef } = useRoomRefs()
  const { handleStartStroke, handleEndStroke, handleMouseMove, handleUndo } = useDraw()
  return (
    <div className="drawingAreaContainer">
      <motion.canvas
        ref={canvasRef}
        className="drawingArea"
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onMouseDown={handleStartStroke}
        onMouseUp={handleEndStroke}
        onMouseMove={handleMouseMove}
      />
      {isYourTurnRef.current ? (
        <Button className="undoButton" onClick={handleUndo}>
          Undo
        </Button>
      ) : null}
    </div>
    
  )
}

export default DrawingArea