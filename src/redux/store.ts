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

export type RootState = ReturnType<typeof store.getState>;

//перевод
// Сделай тип RootState = который ссылается на тип ReturnType
//Который содержит в себе generic, который берёт типы из всего стейта
