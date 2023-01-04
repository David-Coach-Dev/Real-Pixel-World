import "./App.css";
import * as path from 'path'
import logo from "./assets/logo_v2.png";
import mapa from "./assets/mapa_mudo_01.jpg";

function App() {
  return (
    <div className="App">
      <h1>
        <img src={logo} alt="mapa" width="60" height="40" /> Real Pixel World
      </h1>
        <img src={mapa} alt="mapa" width="1024" height="768"/>

    </div>
  );
}

export default App;
