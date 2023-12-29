import { useRef, useState, useEffect, useCallback } from 'react';

import { useRoomRefs } from '../../../pages/room/hooks/useRoomRefs';
import { useCtx } from './useCtx';
import { socket } from "../../../common/socket"

export const useDraw = () => {
  const { isYourTurnRef, canvasRef } = useRoomRefs()
  const ctx = useCtx()
  const [isDrawing, setIsDrawing] = useState(false)
  const currentStrokeStartTime = useRef(0)
  const currentStroke = useRef([])

  const drawLine = (startX, startY, endX, endY) => {
    ctx.beginPath();
    ctx.lineTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
  }

  const drawStrokes = useCallback((strokes) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    strokes.forEach((stroke) => {
      ctx.beginPath();
      stroke.forEach((point) => {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      })
      ctx.closePath();
    })
  }, [ctx, canvasRef])

  useEffect(() => {
    socket.on("newDraw", ({start, end}) => {
      drawLine(start.x, start.y, end.x, end.y)
    })

    socket.on("redraw", (strokes) => {
      drawStrokes(strokes)
    })

    return () => {
      socket.off("newDraw")
      socket.off("redraw")
    }
  })

  useEffect(() => {
    if (ctx) {
      socket.emit("joinedRoom")
    }
  }, [ctx, drawStrokes])

  const getCoordsInDrawingAreaFromEvent = (e) => ({
    x: e.pageX - e.target.offsetLeft,
    y: e.pageY - e.target.offsetTop, 
    t: Math.round(e.timeStamp - currentStrokeStartTime.current)
  })

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (!isDrawing || !isYourTurnRef.current) return

    const curPoint = getCoordsInDrawingAreaFromEvent(e)
    const prevPoint = currentStroke.current[currentStroke.current.length - 1]

    drawLine(prevPoint.x, prevPoint.y, curPoint.x, curPoint.y)

    // emit drawing for others
    socket.emit("draw", {
      start: prevPoint,
      end: curPoint
    })

    currentStroke.current.push(curPoint)
  }

  const handleStartStroke = (e) => {
    e.preventDefault()
    if (e.button === 0 && isYourTurnRef.current) {
      setIsDrawing(true);
      currentStrokeStartTime.current = e.timeStamp
      currentStroke.current = [getCoordsInDrawingAreaFromEvent(e)]
      socket.emit("startDrawStroke", currentStroke.current[0])
    }
  }

  const handleEndStroke = useCallback(() => {
    if (isYourTurnRef.current) {
      currentStroke.current = []
      setIsDrawing(false)
      socket.emit("endDrawStroke")
    }
  }, [isYourTurnRef])

  useEffect(() => {
    handleEndStroke()
  }, [isYourTurnRef, handleEndStroke])

  const handleUndo = (e) => {
    e.preventDefault()
    socket.emit("undo")
  }

  return {
    handleStartStroke,
    handleMouseMove,
    handleEndStroke,
    drawStrokes,
    handleUndo
  }
}