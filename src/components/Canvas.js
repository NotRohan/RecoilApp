import React, { useEffect, useRef } from 'react'

export default function Canvas() {

  const refContainer = useRef(null);
  const ctxContext = useRef(null);
  let isPainting = false;
  const userStrokeStyle = '#fff';
  let prevPos = { offsetX: 0, offsetY: 0 };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    isPainting = true;
    prevPos = { offsetX, offsetY };
  }

  const onMouseMove = ({ nativeEvent }) => {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      paint(offSetData, userStrokeStyle);
    }
  }

  const endPaintEvent = () => {
    if (isPainting) {
      isPainting = false;
    }
  }

  const paint = (currPos, strokeStyle) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    ctxContext.current.beginPath();
    ctxContext.current.strokeStyle = strokeStyle;
    ctxContext.current.moveTo(x, y);
    ctxContext.current.lineTo(offsetX, offsetY);
    ctxContext.current.stroke();
    prevPos = { offsetX, offsetY };
  }


  useEffect(() => {
    refContainer.current.width = 1000;
    refContainer.current.height = 800;
    ctxContext.current = refContainer.current.getContext('2d');
    ctxContext.current.lineJoin = 'round';
    ctxContext.current.lineCap = 'round';
    ctxContext.current.lineWidth = 1;
  }, [])


  return (
    <canvas
      ref={refContainer}
      style={{ background: 'black' }}
      onMouseDown={onMouseDown}
      onMouseLeave={endPaintEvent}
      onMouseUp={endPaintEvent}
      onMouseMove={onMouseMove}
    />
  )
}
