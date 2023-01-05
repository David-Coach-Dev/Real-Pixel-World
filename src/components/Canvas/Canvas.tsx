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
      if (e.button !== 0) {
        return;
      }

      const canvasBoundingRect = canvas.getBoundingClientRect();
      const x1 = e.clientX - canvasBoundingRect.left;
      const y1 = e.clientY - canvasBoundingRect.top;
      const cellX = Math.floor(x1 / cellPixelLength);
      const cellY = Math.floor(y1 / cellPixelLength);
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
    //
    if (a === 0) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
        guide.insertAdjacentHTML("beforeend", "<div></div>")
      );
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.lineCap = "round";
      context.lineWidth = 5;
      contextRef.current = context;
      setA(1);
      const img = new Image();
      img.src = "https://i.imgur.com/NpP3gxD.jpeg" || "../../assets/mapa_mudo_01.jpg";
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    context.strokeStyle = isColor;
  }, [isColor]);
  const drawImage = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = e.target.files[0];
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleToggleGuide = () => {
    setToggleGuide(!toggleGuide);
  };



  function startDrawing({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  }

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
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  const setToClear = () => {
    contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };
  const setToSave = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = canvas.toDataURL("image/png");
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
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
          onChange={(e) => { handleColorChange(e); }}
        />
        <button onClick={handleToggleGuide}>Toggle Guide</button>
        <button onClick={setToSave}>Save</button>
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
  //background-image: url("https://i.imgur.com/NpP3gxD.jpeg");
  border: 1px solid #c01d1d;
`;
export const CanvasGuide = styled.div`
  display: grid;
  pointer-events: none;
  position: absolute;
  //border: 2px solid #c01d1d;
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
  index: 1;
`;

export default Canvas;
