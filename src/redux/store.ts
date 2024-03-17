import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice/filterSlice';
import cart from './slices/cartSlice/cartSlice';
import game from './slices/gameSlice/gameSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		game,
	},
});
//типизация dispatch который функциюю отправляет
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
//перевод
// Сделай тип RootState = который ссылается на тип ReturnType
//Который содержит в себе generic, который берёт типы из всего стейта
