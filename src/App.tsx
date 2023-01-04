import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { NotificationProvider } from "./context";
import { AppRouter } from "./routers";

function App() {
  return (
    <>
      <NotificationProvider >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}
export default App;
