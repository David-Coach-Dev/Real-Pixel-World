import { RouterLayout } from "@/common";
import { Home, Login, Register } from "@/pages";
import { Route, Routes } from "react-router-dom";


export const AppRouter:React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<div> <h2>Error 404</h2> </div>} />
    </Routes>
  );
}