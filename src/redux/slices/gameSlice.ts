import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

//перейти,достать,вернуть (Санка получения данных)
export const fetchGames = createAsyncThunk<Game[], Record<string, string>>(
	'game/fetchGamesStatus',
	async (params) => {
		const { sortBy, category, search } = params;
		const { data } = await axios.get<Game[]>(
			`https://e7feb94fe973f168.mokky.dev/items?${category}&sortBy=${sortBy}${search}`
		);
		return data;
	}
);

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

interface GameSliceState {
	items: Game[];
	status: 'loading' | 'success' | 'error';
}

const initialState: GameSliceState = {
	items: [],
	status: 'loading', //loading | success | error (для контроля скелетона)
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
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchGames.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});
//селекторы
export const selectGameData = (state: RootState) => state.game;

// Action creators are generated for each case reducer function
export const { setItems } = gameSlice.actions;

export default gameSlice.reducer;
