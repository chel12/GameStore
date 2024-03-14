import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


import './scss/app.scss';
import { Cart } from './pages/Cart';
import FullGame from './pages/FullGame';
import MainLayout from './layouts/MainLayout';



function App() {
	//https://e7feb94fe973f168.mokky.dev/items

	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/game/:id" element={<FullGame />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
		// <Routes>
		//
		// </Routes>
	);
}

export default App;
