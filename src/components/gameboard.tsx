import React, { useEffect, useRef } from "react";

interface Circle {
  x: number;
  y: number;
  size: number;
}

export const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleRef = useRef<Circle>({
    x: 0,
    y: 0,
    size: 20,
  });
  const squareSize = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { x, y, size } = circleRef.current;

      if (event.key === "ArrowUp" && y - squareSize >= 0) {
        circleRef.current = { x, y: y - squareSize, size };
      } else if (event.key === "ArrowDown" && y + squareSize < canvas.height) {
        circleRef.current = { x, y: y + squareSize, size };
      } else if (event.key === "ArrowLeft" && x - squareSize >= 0) {
        circleRef.current = { x: x - squareSize, y, size };
      } else if (event.key === "ArrowRight" && x + squareSize < canvas.width) {
        circleRef.current = { x: x + squareSize, y, size };
      }

      drawCircle();
    };

    const drawCircle = () => {
      const { x, y, size } = circleRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(x + squareSize / 2, y + squareSize / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={10 * squareSize}
        height={10 * squareSize}
        style={{ border: "1px solid black" }}
      />
    </>
  );
};
