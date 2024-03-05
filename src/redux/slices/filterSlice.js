import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setPageCount(state, action) {
			state.pageCount = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setPageCount } = filterSlice.actions;

export default filterSlice.reducer;
