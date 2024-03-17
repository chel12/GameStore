import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameSliceState, Status } from './types';
import { fetchGames } from './asyncActions';

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

// Action creators are generated for each case reducer function
export const { setItems } = gameSlice.actions;

export default gameSlice.reducer;
