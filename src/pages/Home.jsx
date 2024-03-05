import React, { useEffect, useState, useContext } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Sort } from '../components/Sort/Sort';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
	const navigate = useNavigate();

	//селекторы для редакса
	const { categoryId, sort, currentPage } = useSelector(
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

	//вытащить теперь строку из url и перевести её в обьект
	useEffect(() => {
		if (window.location.search) {
			//получить из обьект
			const params = qs.parse(window.location.search.substring(1));
		}
	}, []);

	useEffect(() => {
		setIsLoading(true);
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

	useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: sort.sortProperty,
			categoryId,
		});
		navigate(`?${queryString}`);
	}, [categoryId, sort.sortProperty]);

	const skeletonLoader = [...new Array(8)].map((_, index) => (
		<GameBlockSkeleton key={index} />
	));
	const games = items.map((item) => (
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
	));

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
					{isLoading ? skeletonLoader : games}
				</div>
				<Pagination
					currentPage={currentPage}
					onChangePage={onChangePage}
				/>
			</div>
		</>
	);
};
export default Home;
