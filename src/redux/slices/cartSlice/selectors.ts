import { RootState } from '../../store';

//селекторы
export const selectCart = (state: RootState) => state.cart;

export const selectCartItemId = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);
