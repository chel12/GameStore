import React, { useEffect, useState, useContext } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';

import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
	//селекторы для редакса
	const categoryId = useSelector((state) => state.filter.categoryId);
	const sort = useSelector((state) => state.filter.sort);

	//
	//диспатч
	const dispatch = useDispatch();
	//

	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	//категории
	// const [valueCategories, setValueCategories] = useState(0);
	//сортировка

	const { searchValue } = useContext(AppContext);
	//const [currentPage, setCurrentPage] = useState(1);
	//поиск для статики. переделал на запрос с бекенда
	// const filteredItem = items.filter((item) =>
	// 	item.title.toLowerCase().includes(searchValue.toLowerCase())
	// );

	const search = searchValue ? `&title=*${searchValue}` : '';

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://e7feb94fe973f168.mokky.dev/items?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sort.sortProperty}${search}`
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
	}, [categoryId, sort, searchValue]);

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories
						categoryId={categoryId}
						onChangeCategory={(i) => onChangeCategory(i)}
					/>
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
				<Pagination />
			</div>
		</>
	);
};
export default Home;
