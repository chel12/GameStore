import { Sort } from './../../components/Sort/Sort';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
	name: string;
	sortProperty:
		| 'rating'
		| '-rating'
		| 'title'
		| '-title'
		| 'price'
		| '-price';
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setPageCount(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},

		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
		},
	},
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const {
	setCategoryId,
	setSort,
	setPageCount,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
