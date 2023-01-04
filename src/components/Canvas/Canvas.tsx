import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export interface CanvasInterface {}

const Canvas: React.FC<CanvasInterface> = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isColor, setColor] = useState("");
  const [toggleGuide, setToggleGuide] = useState(true);
  const [x, setX] = useState(1280);
	const [y, setY] = useState(780);
  const [a, setA] = useState(0);
 
	useEffect(() => {
    const guide = document.getElementById("guide");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    guide.style.width = `${canvas.width}px`;
    guide.style.height = `${canvas.height}px`;
    const CELL_SIDE_COUNT = 100;
    const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
    const colorHistory = {};
    guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    guide.style.display = toggleGuide ? null : "none";
    //
     canvas.addEventListener("mousedown", handleCanvasMousedown);
     function handleCanvasMousedown(e) {
       // Ensure user is using their primary mouse button
       if (e.button !== 0) {
        return;
       }

       const canvasBoundingRect = canvas.getBoundingClientRect();
       const x = e.clientX - canvasBoundingRect.left;
       const y = e.clientY - canvasBoundingRect.top;
       const cellX = Math.floor(x / cellPixelLength);
       const cellY = Math.floor(y / cellPixelLength);
       const currentColor = colorHistory[`${cellX}_${cellY}`];

       if (e.ctrlKey) {
         if (currentColor) {
           setColor(currentColor);
         }
       } else {
         fillCell(cellX, cellY);
       }
     }
    function fillCell(cellX, cellY) {
      const startX = cellX * cellPixelLength;
      const startY = cellY * cellPixelLength;

      context.fillStyle = isColor;
      context.fillRect(startX, startY, cellPixelLength, cellPixelLength);
      colorHistory[`${cellX}_${cellY}`] = isColor;
    }

    //sfgdf
    if (a === 0) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
        guide.insertAdjacentHTML("beforeend", "<div></div>")
      );
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
	
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <CanvasStyle>
      <CanvasGuide id="guide"></CanvasGuide>
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
  cursor: pointer;
`;
export const CanvasGuide = styled.div`
  display: grid;
  pointer-events: none;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);

`;

export default Canvas;
