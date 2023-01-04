import logo from "../src/assets/logo_v2.png.png";
import mapa from "../src/assets/mapa_mudo_01.jpg";
import "./App.css";

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
