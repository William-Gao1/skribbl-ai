import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';

import { useRoomRefs } from '../../pages/room/hooks/useRoomRefs';
import { useDraw } from './hooks/useDraw';

import './DrawingArea.css'

const CANVAS_SIZE = {width: 550, height: 550}

const DrawingArea = () => {
  const { canvasRef, isYourTurnRef } = useRoomRefs()
  const { 
    handleStartStroke, 
    handleEndStroke, 
    handleMouseMove, 
    handleUndo, 
    handleClear 
  } = useDraw()
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
        <div className="drawActionButtons">
          <Button className="undoButton" onClick={handleUndo}>
            Undo
          </Button>
          <Button className="clearButton" onClick={handleClear}>
            Clear
          </Button>
        </div>
        
      ) : null}
    </div>
    
  )
}

export default DrawingArea