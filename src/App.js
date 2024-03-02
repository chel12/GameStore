import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import { Cart } from './pages/Cart';
import { createContext, useState } from 'react';

export const AppContext = createContext({});

function App() {
	//https://e7feb94fe973f168.mokky.dev/items
	const [searchValue, setSearchValue] = useState('');

	return (
		<AppContext.Provider value={{ searchValue, setSearchValue }}>
			<div className="wrapper">
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
