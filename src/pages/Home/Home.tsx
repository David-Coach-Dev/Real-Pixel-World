import { Canvas, Pizarra } from "@/components";
import { useNotification } from "@/context";
import { useEffect } from "react";
export interface HomeInterface {}
const Home: React.FC<HomeInterface> = () => {
  useEffect(() => {
    getSuccess("Bienvenidos a Real pixel world");
  }, []);
  const { getSuccess, getError } = useNotification();
  const handleClick = () => {
    getSuccess("👋 Bienvenidos a Real Pixel Word.");
  };
  return (
    <>
      <Canvas />
      <Pizarra />
    </>
  );
};
export default Home;
