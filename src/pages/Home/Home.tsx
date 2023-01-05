import { Canvas } from "@/components";
import { useNotification } from "@/context";


export interface HomeInterface {}
const Home: React.FC<HomeInterface> = () => {
  const { getSuccess, getError } = useNotification();
  const handleClick = () => {
    getSuccess("👋 Bienvenidos a Real Pixel Word.");
  };
  return (
    <>
      <Canvas />
   
    </>
  );
};
export default Home;
