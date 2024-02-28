import './scss/app.scss';

import { Header } from './components/Header/Header';
import { Categories } from './components/Categories/Categories';
import { Sort } from './components/Sort/Sort';
import { GameBlock } from './components/GameBlock/GameBlock';
import { useEffect, useState } from 'react';
import GameBlockSkeleton from './components/GameBlock/GameBlockSkeleton';

function App() {
	//https://e7feb94fe973f168.mokky.dev/items
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://e7feb94fe973f168.mokky.dev/items')
			.then((res) => {
				//в джейсон
				return res.json();
			})
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			}); //используем джейсон
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все игры</h2>
					<div className="content__items">
						{isLoading
							? [...new Array(8)].map((_, index) => (
									<GameBlockSkeleton key={index} />
							  ))
							: items.map((item) =>
									isLoading ? (
										<GameBlockSkeleton />
									) : (
										<GameBlock
											title={item.title}
											price={item.price}
											id={item.id}
											imgUrl={item.imgUrl}
											types={item.types}
											editions={item.editions}
											category={item.category}
											rating={item.rating}
										/>
									)
							  )}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
