import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setItems } = gameSlice.actions;

export default gameSlice.reducer;
