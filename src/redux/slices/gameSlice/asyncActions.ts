import axios from 'axios';
import { Game, SearchGameParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

//перейти,достать,вернуть (Санка получения данных)
export const fetchGames = createAsyncThunk<Game[], SearchGameParams>(
	'game/fetchGamesStatus',
	async (params) => {
		const { sortBy, category, search } = params;
		const { data } = await axios.get<Game[]>(
			`https://e7feb94fe973f168.mokky.dev/items?${category}&sortBy=${sortBy}${search}`
		);
		return data;
	}
);
