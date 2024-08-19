import React, { useRef, useState, useEffect } from 'react';

const CanvasWithLineWidth: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const startDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) context.closePath();
    }
  };

  const handleLineWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(event.target.value));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 550;
    }
  }, []);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="50"
        value={lineWidth}
        onChange={handleLineWidthChange}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default CanvasWithLineWidth;
