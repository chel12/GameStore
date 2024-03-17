import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import NotFound from './pages/NotFound';
import './scss/app.scss';
// import { Cart } from './pages/Cart';
import FullGame from './pages/FullGame';
import MainLayout from './layouts/MainLayout';

const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	//https://e7feb94fe973f168.mokky.dev/items

	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route
					path="/cart"
					element={
						<Suspense fallback={<div>Загрузка корзины..</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route path="/game/:id" element={<FullGame />} />
				<Route
					path="*"
					element={
						<Suspense fallback={<div>Загрузка..</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
