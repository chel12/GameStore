export type SearchGameParams = {
	sortBy: string;
	category: string;
	search: string;
};

export type Game = {
	id: string;
	imgUrl: string;
	title: string;
	types: string[];
	editions: string[];
	price: number;
	category: string;
	rating: number;
};
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface GameSliceState {
	items: Game[];
	status: Status;
}
