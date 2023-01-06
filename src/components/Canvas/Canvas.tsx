import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface CanvasInterface {}

const Canvas: React.FC<CanvasInterface> = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isColor, setColor] = useState("#834745");
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);
  const [isPixelX, setIsPixelX] = useState(0);
  const [isPixelY, setIsPixelY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoom, setIsZoom] = useState(1);
  const logo = "https://i.imgur.com/dslrfVI.png";
  const fondo = "./src/assets/mapa_mudo_01.png";
  let mapaHistory = {};
  const colorHistory = {};

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Cargando Canvas
    if (!isLoaded) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      contextRef.current = context;
      setIsLoaded(true);
      let img = new Image();
      img.src = fondo;
      console.log(img.src);      img.onload = function () {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
      };
    }
    const CELL_SIDE_COUNT = 500;
    const cellPixelLengthX = canvas.width / CELL_SIDE_COUNT;
    const cellPixelLengthY = canvas.height / CELL_SIDE_COUNT;
    //

    function handleWindowMousemove(e) {
      const canvasBoundingRect = canvas.getBoundingClientRect();
      setIsX(
        Math.floor((e.clientX - canvasBoundingRect.left) / cellPixelLengthX)
      );
      setIsY(
        Math.floor((e.clientY - canvasBoundingRect.top) / cellPixelLengthY)
      );
    }
    function handleCanvasMousedown(e) {
      if (e.button !== 0) {
        return;
      }
      const canvasBoundingRect = canvas.getBoundingClientRect();
      const cellX = Math.floor(
        (e.clientX - canvasBoundingRect.left) / cellPixelLengthX
      );
      const cellY = Math.floor(
        (e.clientY - canvasBoundingRect.top) / cellPixelLengthY
      );
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
      const startX = cellX * cellPixelLengthX;
      const startY = cellY * cellPixelLengthY;
      context.fillStyle = isColor;
      context.fillRect(startX, startY, cellPixelLengthX, cellPixelLengthY);
      colorHistory[`${cellX}_${cellY}`] = isColor;
    }
    canvas.addEventListener("mousedown", handleCanvasMousedown);
    window.addEventListener("mousemove", handleWindowMousemove);
    context.strokeStyle = isColor;
    context.scale(1, isZoom);
  }, [isColor, isZoom]);

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
    setIsZoom(isZoom + 1);
  };
  const setToMenos = () => {
    setIsZoom(isZoom - 1);
  };
  const setToNormal = () => {
    setIsZoom(1);
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
        <canvas className="canvas-container" ref={canvasRef}></canvas>
      </CanvasStyle>
      <CanvasControle>
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button onClick={setToClear}>Clear</button>
        <button onClick={setToSave}>Save</button>
        <button onClick={setToMas}>+ 0.1</button>
        <button onClick={setToMenos}>- 0.1</button>
        <button onClick={setToNormal}>1</button>

        <label id="coor_x">
          zoom = {isZoom}
        </label>
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
