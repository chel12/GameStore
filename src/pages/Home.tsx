import React, { useEffect, useRef } from 'react';

import { Categories } from '../components/Categories/Categories';
import { SortP, sortList } from '../components/Sort/Sort';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { GameBlock } from '../components/GameBlock/GameBlock';
import GameBlockSkeleton from '../components/GameBlock/GameBlockSkeleton';

import Pagination from '../components/Pagination/Pagination';

import { useSelector } from 'react-redux';
import {
	setCategoryId,
	setPageCount,
	setFilters,
	selectFilter,
} from '../redux/slices/filterSlice';

import {
	SearchGameParams,
	fetchGames,
	selectGameData,
} from '../redux/slices/gameSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const isSearch = useRef(false);
	//для проверки, если запрос из url чтобы не получать

	const isMounted = useRef(false);
	//для проверки, чтобы не вшивал qs все данные сразу в url при 1 рендере

	const navigate = useNavigate();

	//селекторы для редакса
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const { items, status } = useSelector(selectGameData);

	//диспатч
	const dispatch = useAppDispatch();

	//сортировка

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number: number) => {
		dispatch(setPageCount(number));
	};
	// для запросов

	//отдельная функция для избежания дабл рендеринга
	const getGames = async () => {
		const sortBy = sort.sortProperty;
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&title=*${searchValue}` : '';

		dispatch(fetchGames({ sortBy, category, search }));

		window.scroll(0, 0);
	};

	//вытащить теперь строку из url и перевести её в обьект
	useEffect(() => {
		if (window.location.search) {
			//получить из URL обьект
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchGameParams;
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortBy
			);
			//после получения URL,отправляем в Redux запрос и устанавливаем фильтр
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					sort: sort || sortList[0],
					currentPage,
				})
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getGames();
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
	const games = items.map((item: any) => (
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
						onChangeCategory={onChangeCategory}
					/>
					<SortP />
				</div>
				<h2 className="content__title">Все игры</h2>
				{status === 'error' ? (
					<div className="content__error-info">
						<h2>Что-то пошло не так :/ </h2>
						<p>Не удалось загрузить Каталог</p>
					</div>
				) : (
					<div className="content__items">
						{status === 'loading' ? skeletonLoader : games}
					</div>
				)}

				<Pagination
					currentPage={currentPage}
					onChangePage={onChangePage}
				/>
			</div>
		</>
	);
};
export default Home;
