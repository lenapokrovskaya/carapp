import {CarForm} from "../components/CarForm";
import {CarList} from "../components/CarList";
import {CarMap} from "../components/CarMap";


export const Home = () => {
	return (
		<main>
			<h1>Управление машинами</h1>
			<CarForm/>
			<CarList/>
			<CarMap/>
		</main>
	);
};
