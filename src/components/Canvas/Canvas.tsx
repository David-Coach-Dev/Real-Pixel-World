import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface CanvasInterface {}

const Canvas: React.FC<CanvasInterface> = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isColor, setColor] = useState("#834745");
  const [toggleGuide, setToggleGuide] = useState(true);
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isPixelX, setIsPixelX] = useState(0);
  const [isPixelY, setIsPixelY] = useState(0);
  const [a, setA] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const CELL_SIDE_COUNT = 500;
    const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
    const colorHistory = {};
    //
    if (a === 0) {
      context.fillStyle = "#E47979";
      canvas.width = (window.innerWidth);
      canvas.height = (window.innerHeight);
      contextRef.current = context;
      setA(1);
      const img = new Image();
      img.src = "../../assets/";
      context.drawImage(img, 0, 0);
    }
    //
    canvas.addEventListener("mousedown", handleCanvasMousedown);
    window.addEventListener("mousemove", handleWindowMousemove);

    function handleWindowMousemove(e) {
      const canvasBoundingRect = canvas.getBoundingClientRect();
      setIsX(
        Math.floor((e.clientX - canvasBoundingRect.left) / cellPixelLength)
      );
      setIsY(
        Math.floor((e.clientY - canvasBoundingRect.top) / cellPixelLength)
      );
    }
    function handleCanvasMousedown(e) {
      if (e.button !== 0) {
        return;
      }
      const canvasBoundingRect = canvas.getBoundingClientRect();
      const x1 = e.clientX - canvasBoundingRect.left;
      const y1 = e.clientY - canvasBoundingRect.top;
      const cellX = Math.floor(x1 / cellPixelLength);
      const cellY = Math.floor(y1 / cellPixelLength);
      setIsPixelX(cellX);
      setIsPixelY(cellY);
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
    context.strokeStyle = isColor;
  }, [isColor, toggleGuide, a]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleToggleGuide = () => {
    setToggleGuide(!toggleGuide);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  const setToClear = () => {
    contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };

  return (
    <>
      <CanvasStyle>
        <CanvasGuide id="guide"></CanvasGuide>
        <canvas
          className="canvas-container"
          ref={canvasRef}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        ></canvas>
      </CanvasStyle>
      <CanvasControle>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button onClick={setToClear}>Clear</button>
        <label id="coor_x">
          x = {isX} - y = {isY}{" "}
        </label>
        <label id="pixel_x">
          x = {isPixelX} - y = {isPixelY}{" "}
        </label>
        <input
          type="color"
          value={isColor}
          onChange={(e) => {
            handleColorChange(e);
          }}
        />
        <button onClick={handleToggleGuide}>Toggle Guide</button>
        <a
          id="download_image_link"
          href="download_link"
          onClick={saveImageToLocal}
        >
          Download Image
        </a>
      </CanvasControle>
    </>
  );
};

export const CanvasStyle = styled.div`
  cursor: pointer;
  border: 1px solid #c01d1d;
`;
export const CanvasGuide = styled.div`
  display: grid;
  pointer-events: none;
  position: absolute;
  border: 1px solid #c01d1d;
`;
export const CanvasControle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //margin: 5px;
  //padding: 5px;
  border: 2px solid #c01d1d;
  line-color: #c01d1d;
  cursor: pointer;
  index: 1;
`;
export default Canvas;
