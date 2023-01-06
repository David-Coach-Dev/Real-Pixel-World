import { stringify } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
export interface CanvasInterface {}
const Canvas: React.FC<CanvasInterface> = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isColor, setColor] = useState("#FF0800");
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isPixelX, setIsPixelX] = useState(0);
  const [isPixelY, setIsPixelY] = useState(0);
  const [isZoom, setIsZoom] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const fondo = "../src/assets/mapa_mudo_01.png";
  const colorHistory = {};
  const [isPixelHistory, setIsPixelHistory] = useState([]);
  let img = new Image();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Cargando Canvas
    const CELL_SIDE_COUNT = 500;
    const cellPixelLengthX = canvas.width / CELL_SIDE_COUNT;
    const cellPixelLengthY = canvas.height / CELL_SIDE_COUNT;
    if (!isLoaded) {
      setIsPixelHistory([]);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 200;
      contextRef.current = context;
      setIsLoaded(true);
      img.src = fondo;
      img.onload = function () {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
      };
    }

    function handleWindowMousemove(e) {
      const cellPixelLengthX = canvas.width / CELL_SIDE_COUNT;
      const cellPixelLengthY = canvas.height / CELL_SIDE_COUNT;
      const canvasBoundingRect = canvas.getBoundingClientRect();
      const X = Math.floor(
        (e.clientX - canvasBoundingRect.left) / cellPixelLengthX
      );
      const Y = Math.floor(
        (e.clientY - canvasBoundingRect.top) / cellPixelLengthY
      );
      setIsX(X);
      setIsY(Y);
    }
    function handleCanvasMousedown(e) {
      const cellPixelLengthX = canvas.width / CELL_SIDE_COUNT;
      const cellPixelLengthY = canvas.height / CELL_SIDE_COUNT;
      if (e.button !== 0) {
        return;
      }
      const canvasBoundingRect = canvas.getBoundingClientRect();
      const x1 = e.clientX - canvasBoundingRect.left;
      const y1 = e.clientY - canvasBoundingRect.top;
      const cellX = Math.floor(x1 / cellPixelLengthX);
      const cellY = Math.floor(y1 / cellPixelLengthY);
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
    function fillCell(cellX, cellY, color = isColor) {
      const startX = cellX * cellPixelLengthX;
      const startY = cellY * cellPixelLengthY;
      context.fillStyle = color;
      context.fillRect(startX, startY, cellPixelLengthX, cellPixelLengthY);
      colorHistory[`${cellX}_${cellY}`] = color;
      isPixelHistory.push({ [`${cellX}_${cellY}`]: color });
      setIsHistory(true);
    }
    //cargar pixeles
    if (isHistory) {
      const cellPixelLengthX = canvas.width / CELL_SIDE_COUNT;
      const cellPixelLengthY = canvas.height / CELL_SIDE_COUNT;
      for (let j in isPixelHistory) {
        for (let i in isPixelHistory[j]) {
          let cX = parseInt(i.split("_")[0]);
          let cY = parseInt(i.split("_")[1]);
          let color = isPixelHistory[j][i];
          const sX = cX * cellPixelLengthX;
          const sY = cY * cellPixelLengthY;
          context.fillStyle = color;
          context.fillRect(sX, sY, cellPixelLengthX, cellPixelLengthY);
          context.restore();
        }
      }
    }
    canvas.addEventListener("mousedown", handleCanvasMousedown);
    window.addEventListener("mousemove", handleWindowMousemove);
    context.strokeStyle = isColor;
    context.scale(isZoom, isZoom);
  }, [isColor, isLoaded]);
  //----------

  const handleColorChange = (e) => {
    setColor(e.target.value);
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
    let image = canvasRef.current.toDataURL("image/png");
    console.log(image);
    let link = document.getElementById("download_image_link");
    link.setAttribute("download", "canvas.png");
    link.setAttribute("target", "_blank");
    link.click();
    link.setAttribute("href", image);
  };
  const setToMas = () => {
    console.log(isHistory);
    if (isZoom < 10) {
      setIsZoom(isZoom + 1);
      setIsLoaded(false);
    }
  };
  const setToMenos = () => {
    if (isZoom > 1) {
      setIsZoom(isZoom - 1);
      setIsLoaded(false);
    }
  };
  const setToNormal = () => {
    setIsZoom(1);
    setIsLoaded(false);
  };
  return (
    <>
      <CanvasStyle>
        <canvas
          className="canvas-container"
          ref={canvasRef}
          id="canvas"
        ></canvas>
      </CanvasStyle>
      <CanvasControle>
        <label id="coor_x">
          Coor en x = {isX} y = {isY}
        </label>
        <label id="pixel_x">
          Pixel en x = {isPixelX} y = {isPixelY}
        </label>
        <label id="history">Historia = {isHistory?"Verdadero":"falso"}</label>
        <CanvasButton>
          <label id="color">Color :</label>
          <input
            type="color"
            value={isColor}
            onChange={(e) => {
              handleColorChange(e);
            }}
          />
        </CanvasButton>
        <CanvasButton>
          <button onClick={setToDraw}>Draw</button>
          <button onClick={setToErase}>Erase</button>
          <button onClick={setToClear}>Clear</button>
          <button onClick={setToSave}>Save</button>
        </CanvasButton>
        <CanvasButton>
          <button onClick={setToMas}> + </button>
          <button onClick={setToNormal}> resect </button>
          <button onClick={setToMenos}> - </button>
          <label id="coor_x">zoom = {isZoom}</label>
        </CanvasButton>
      </CanvasControle>
    </>
  );
};

export const CanvasStyle = styled.div`
  cursor: pointer;
  border: 1px solid #c01d1d;
`;
export const CanvasControle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #c01d1d;
  cursor: pointer;
  padding: 0 10px 0 10px;
  gap: 10px;
`;
export const CanvasButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 10px 0 10px;
  space: 10px;
  gap: 10px;
`;
export default Canvas;
