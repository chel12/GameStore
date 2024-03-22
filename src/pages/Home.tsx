import React, { useCallback, useEffect, useRef } from 'react';

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
} from '../redux/slices/filterSlice/filterSlice';
import { selectFilter } from '../redux/slices/filterSlice/selectors';

import { fetchGames } from '../redux/slices/gameSlice/asyncActions';
import { selectGameData } from '../redux/slices/gameSlice/selectors';
import { SearchGameParams } from '../redux/slices/gameSlice/types';
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
	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

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

	//! url формирует
	useEffect(() => {
		//! проверка был ли рендер ранее
		if (isMounted.current) {
			//!создать url
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
			});
			console.log(queryString);
			//!перейти по урлу
			navigate(`?${queryString}`);
		}
		//чтобы при первом рендере не рендерил тоже
		isMounted.current = true;
	}, [categoryId, sort.sortProperty]);

	//! если был первый рендер, тогда запрашиваем игры
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getGames();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue]);

	//!вытащить теперь строку из url и перевести её в обьект
	useEffect(() => {
		if (window.location.search) {
			//получить из URL обьект substring(1)уберет '?' так как нельзя в обьект его
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchGameParams;
			console.log(params);
			//сортировка
			const sort = sortList.find(
				//пробежаться по каждому обьекту и вернуть то что совпадает с url
				(obj) => obj.sortProperty === params.sortBy
			);
			//!после получения URL,отправляем в Redux запрос и устанавливаем фильтр
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: parseInt(params.category),
					sort: sort || sortList[0],
					currentPage,
				})
			);
		}
		isSearch.current = true;
	}, []);

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
					<SortP value={sort} />
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
