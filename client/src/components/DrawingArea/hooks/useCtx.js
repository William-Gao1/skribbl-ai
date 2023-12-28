import { useEffect, useState } from 'react';

import { useRoomRefs } from '../../../pages/room/hooks/useRoomRefs';

export const useCtx = () => {
  const { canvasRef } = useRoomRefs();

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const newCtx = canvasRef.current?.getContext('2d');

    if (newCtx) {
      newCtx.lineJoin = 'round';
      newCtx.lineCap = 'round';
      newCtx.lineWidth = 5
      setCtx(newCtx);
    }
  }, [canvasRef]);

  return ctx;
};