import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			console.log(action);
			state.categoryId = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
