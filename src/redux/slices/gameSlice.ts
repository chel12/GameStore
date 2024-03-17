import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

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
export type SearchGameParams = {
	sortBy: string;
	category: string;
	search: string;
};

type Game = {
	id: string;
	imgUrl: string;
	title: string;
	types: string[];
	editions: string[];
	price: number;
	category: string;
	rating: number;
};
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface GameSliceState {
	items: Game[];
	status: Status;
}

const initialState: GameSliceState = {
	items: [],
	status: Status.LOADING, //loading | success | error (для контроля скелетона)
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Game[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		//обработка Санки и состояний её, где задаём статус загрузки
		builder
			.addCase(fetchGames.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchGames.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});
//селекторы
export const selectGameData = (state: RootState) => state.game;

// Action creators are generated for each case reducer function
export const { setItems } = gameSlice.actions;

export default gameSlice.reducer;
