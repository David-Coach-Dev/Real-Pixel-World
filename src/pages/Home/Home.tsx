import { Canvas } from '@/components';
import { useNotification } from '@/context';
import { Container } from '@mui/material';
import { useEffect } from 'react';
export interface HomeInterface {}
const Home: React.FC<HomeInterface> = () => {
	useEffect(() => {
			getSuccess('Bienvenidos a Real pixel world');
	},[]);
	const {
		getSuccess,
		getError,
	} = useNotification();
	const handleClick = () => {
		getSuccess("👋 Bienvenidos a Real Pixel Word.");
	};
	return(
		<Container
			maxWidth='xl'
		>
			<Canvas />
		</Container>
	);
};
export default Home;