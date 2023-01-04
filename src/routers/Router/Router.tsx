import { RouterLayout } from "@/common";
import { Home, Login } from "@/pages";
import { Route, Routes } from "react-router-dom";


export const AppRouter:React.FC<{}> = () => {
  return (
    <Routes>
      <Route path='/' element={<RouterLayout />}>
        <Route path='/' element={<Home />}/>
      </Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/*' element={<div>Error 404</div>}/>
    </Routes>
  );
}