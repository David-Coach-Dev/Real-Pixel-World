import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export interface CanvasInterface {}

const Canvas: React.FC<CanvasInterface> = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isColor, setColor] = useState("");
  const [x, setX] = useState(1280);
	const [y, setY] = useState(780);
	const [a, setA] = useState(0);
	
	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (a === 0) {
			canvas.width = x;
			canvas.height = y;
			context.lineCap = "round";
			context.lineWidth = 5;
			contextRef.current = context;
			setA(1);
		}
		context.strokeStyle = isColor;
  }, [isColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over" || "";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  const setToClear = () => {
    contextRef.current.clearRect(0, 0, x, y);
  };

  const setChangeColor = (color) => {
    context.strokeStyle = color;
    contextRef.current = context;
  };
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <CanvasStyle>
      <div>
        <canvas
          className="canvas-container"
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
        <div>
          <button onClick={setToDraw}>Draw</button>
          <button onClick={setToErase}>Erase</button>
          <button onClick={setToClear}>Clear</button>
          <input
            type="color"
            value={isColor}
            onChange={(e) => setColor(e.target.value)}
          />
          <a
            id="download_image_link"
            href="download_link"
            onClick={saveImageToLocal}
          >
            Download Image
          </a>
        </div>
      </div>
    </CanvasStyle>
  );
};

export const CanvasStyle = styled.div`
  width: 1280px;
  height: 780px;
  border: 2px solid #323232;
  background-color: #fff;
`;

export default Canvas;
