import React, { useEffect, useRef } from 'react';
import ITransaction from '../../interfaces/ITransaction';

interface GraphComponentProps {
  data: ITransaction[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGraph = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#15803d';

      data.forEach((transaction, index) => {
        const x = (index / data.length) * width;
        const y = height - (transaction.amount * 0.1); // Scale the amount for visualization
        ctx.lineTo(x, y);
      });

      ctx.stroke();

      // Draw X and Y axes
      ctx.beginPath();
      const lineColor = isDarkMode() ? '#FFFFFF' : '#000000';
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3;
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      drawGraph();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Call drawGraph when data changes
    drawGraph();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const isDarkMode = () => {
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return theme;
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '500px', position: 'relative', top: 0, left: 0 }}
      ></canvas>
    </div>
  );
};

export default GraphComponent;
