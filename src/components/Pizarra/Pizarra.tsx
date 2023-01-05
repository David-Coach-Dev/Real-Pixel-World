import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
export interface PizarraInterface {}

const Pizarra : React.FC<PizarraInterface> = () => {
	const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isColor, setColor] = useState("");
  const [toggleGuide, setToggleGuide] = useState(true);
  const [x, setX] = useState(window.innerWidth);
  const [y, setY] = useState(window.innerHeight);
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [a, setA] = useState(0);

  useEffect(() => {
    const guide = document.getElementById("guide");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    guide.style.width = `${canvas.width}px`;
    console.log(canvas.width);
    console.log(canvas.height);
    guide.style.height = `${canvas.height}px`;
    const CELL_SIDE_COUNT = 100;
    const pixelHistory = {};
    guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
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
      var img = new Image();
      img.src = "https://i.imgur.com/NpP3gxD.jpeg";
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
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
    <>
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
        </div>
      </CanvasStyle>
      <CanvasControle>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button onClick={setToClear}>Clear</button>
        <label id="coor_x">
          x = {isX} - y = {isY}{" "}
        </label>

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
      </CanvasControle>
    </>
  );
};
export const CanvasStyle = styled.div`
  cursor: pointer;
  background-image: url("https://i.imgur.com/NpP3gxD.jpeg");
`;
export const CanvasGuide = styled.div`
  display: grid;
  pointer-events: none;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
export const CanvasControle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border: 2px solid #c01d1d;
  cursor: pointer;
  background-image: url("https://i.imgur.com/NpP3gxD.jpeg");
  index: 1;
`
export const PizarraStyle = styled.div``;

export default Pizarra;
