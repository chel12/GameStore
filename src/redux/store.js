import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import game from './slices/gameSlice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		game,
	},
});
