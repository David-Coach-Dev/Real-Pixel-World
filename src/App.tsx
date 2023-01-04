import { useState } from "react";
import mapa from "../public/img/mapa_mudo_01.jpg";
import logo from "../public/img/rpw.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>
        <img src={logo} alt="mapa" width="60" height="40" /> Real Pixel World
      </h1>
      <div>
        <canvas id="mapa" width="1024" height="768">
          <img src={mapa} alt="mapa" width="1024" height="768"/>
        </canvas>
        <p id="clear">clear</p>
        <script src="main.js"></script>
      </div>
    </div>
  );
}

export default App;
