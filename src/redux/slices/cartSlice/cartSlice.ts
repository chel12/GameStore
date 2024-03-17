import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		//добавить 1 кол-во
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload.id
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = calcTotalPrice(state.items);
		},
		//удалить 1 кол-во
		removeOneItem(state, action: PayloadAction<string>) {
			//найди обьект с таким же id
			const findItem = state.items.find(
				(obj) => obj.id === action.payload
			);
			//если правда то сделай -1 count
			if (findItem) {
				findItem.count--;
				state.totalPrice = state.totalPrice - findItem.price;
			}
		},
		//удалить товар с корзины
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(obj) => obj.id !== action.payload
			);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, removeOneItem } =
	cartSlice.actions;

export default cartSlice.reducer;
