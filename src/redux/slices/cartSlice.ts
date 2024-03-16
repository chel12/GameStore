import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	imgUrl: string;
	type: string;
	edition: string;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload.id
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		removeOneItem(state, action: PayloadAction<string>) {
			//найди обьект с таким же id
			const findItem = state.items.find(
				(obj) => obj.id === action.payload
			);
			//если правда то сделай -1 count
			if (findItem) {
				findItem.count--;
			}
		},
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

//селекторы
export const selectCart = (state: RootState) => state.cart;

export const selectCartItemId = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, removeOneItem } =
	cartSlice.actions;

export default cartSlice.reducer;
