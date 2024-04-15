export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}
export enum SortPropertyNameEnum {
	RATING_DESC_Name_DESC = 'популярности ˄',
	RATING_DESC_Name_ASC = 'популярности ˅',
	TITLE_Name_DESC = 'алфавиту ˄',
	TITLE_Name_ASC = 'алфавиту ˅',
	PRICE_Name_DESC = 'цене ˄',
	PRICE_Name_ASC = 'цене ˅',
}

export type Sort = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}
