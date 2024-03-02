import React, { useEffect, useState } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

const Home = ({ searchValue, setSearchValue }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	//категории
	const [valueCategories, setValueCategories] = useState(0);

	//сортировка
	const [valueSort, setValueSort] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

	//поиск для статики. переделал на запрос с бекенда
	const filteredItem = items.filter((item) =>
		item.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	const search = searchValue ? `&title=*${searchValue}` : '';

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://e7feb94fe973f168.mokky.dev/items?${
				valueCategories > 0 ? `category=${valueCategories}` : ''
			}&sortBy=${valueSort.sortProperty}${search}`
		)
			.then((res) => {
				//в джейсон
				return res.json();
			})
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			}); //используем джейсон
		window.scrollTo(0, 0);
	}, [valueCategories, valueSort, searchValue]);

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories
						valueCategories={valueCategories}
						setValueCategories={(i) => setValueCategories(i)}
					/>
					<Sort
						valueSort={valueSort}
						setValueSort={(i) => setValueSort(i)}
					/>
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
		</>
	);
};
export default Home;
