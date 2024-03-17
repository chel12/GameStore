export type CartItem = {
	id: string;
	title: string;
	price: number;
	imgUrl: string;
	type: string;
	edition: string;
	count: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
