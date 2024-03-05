import React, { useEffect, useState, useContext } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';

import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
	//селекторы для редакса
	const { categoryId, sort, pageCount } = useSelector(
		(state) => state.filter
	);
	//диспатч
	const dispatch = useDispatch();
	//стейты
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	//категории
	// const [valueCategories, setValueCategories] = useState(0);
	//сортировка
	const { searchValue } = useContext(AppContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setPageCount(number));
	};
	// для запросов
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&title=*${searchValue}` : '';

	useEffect(() => {
		setIsLoading(true);
		// fetch(
		// 	`https://e7feb94fe973f168.mokky.dev/items?${
		// 		categoryId > 0 ? `category=${categoryId}` : ''
		// 	}&sortBy=${sort.sortProperty}${search}`
		// )
		// 	.then((res) => {
		// 		//в джейсон
		// 		return res.json();
		// 	})
		// 	.then((arr) => {
		// 		setItems(arr);
		// 		setIsLoading(false);
		// 	}); //используем джейсон
		//заменили на аксиос
		axios
			.get(
				`https://e7feb94fe973f168.mokky.dev/items?${category}&sortBy=${sort.sortProperty}${search}`
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue]);

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
										key={item.title}
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
				<Pagination value={pageCount} onChangePage={onChangePage} />
			</div>
		</>
	);
};
export default Home;
