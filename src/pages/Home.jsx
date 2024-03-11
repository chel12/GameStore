import React, { useEffect, useState, useContext, useRef } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Sort, sortList } from '../components/Sort/Sort';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import {
	setCategoryId,
	setPageCount,
	setFilters,
} from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
	const isSearch = useRef(false);
	//для проверки, если запрос из url чтобы не получать
	const isMounted = useRef(false);
	//для проверки, чтобы не вшивал qs все данные сразу в url при 1 рендере
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
	//отдельная функция для избежания дабл рендеринга
	const fetchGames = async () => {
		//убрать - из урла, чтобы красиво было
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&title=*${searchValue}` : '';

		setIsLoading(true);

		try {
			const res = await axios.get(
				`https://e7feb94fe973f168.mokky.dev/items?${category}&sortBy=${sortBy}${search}`
			);
			setItems(res.data);
			setIsLoading(false);
		} catch (error) {
			alert('Ошибка при получение данных', error.message);
			setIsLoading(false);
		}

		window.scroll(0, 0);
	};
	//вытащить теперь строку из url и перевести её в обьект
	useEffect(() => {
		if (window.location.search) {
			//получить из обьект
			const params = qs.parse(window.location.search.substring(1));
			dispatch(setFilters({ ...params, sort }));
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchGames();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue]);

	//url формирует
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
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
