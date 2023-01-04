import { Canvas, HeaderComponent } from '@/components';
import { useNotification } from '@/context';
import { Container } from '@mui/material';
import { useEffect } from 'react';
export interface HomeInterface {}
const Home: React.FC<HomeInterface> = () => {
	useEffect(() => {
		// characters.getAll({page: 1}).then((r) => {
		// 	console.log(r.data.results);
		// 	getSuccess('Cargados '+r.data.results.length+' registros a la Data');
		// }).catch((e) => {
		// 	console.error(e.message);
		// 	getError('Error : '+e.message);
		// })
		//characters.getById({ id: 1 }).then((r) => {
			//console.log(r.data);
			getSuccess('Bienvenidos a Real pixel world');
		//}).catch((e) => {
			//getError('Error : ' + e.message);
		//});
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
			<HeaderComponent
				title={"👋 pixel art's"}
				description={'Bienvenidos a Real Pixel Word'}
			/>
			<Canvas />
		</Container>
	);
};
export default Home;