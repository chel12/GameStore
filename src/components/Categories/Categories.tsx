import React from 'react';


type CategoriesProps = {
	categoryId: number;
	onChangeCategory: (index: number) => void;
};
const categories = [
	'Все',
	'Action',
	'Racing',
	'Strategy',
	'Sports',
	'Flight simulation',
];
export const Categories: React.FC<CategoriesProps> = React.memo(
	({ categoryId, onChangeCategory }) => {

		return (
			<div className="categories">
				<ul>
					{categories.map((li, index) => (
						<li
							key={index}
							onClick={() => onChangeCategory(index)}
							className={categoryId === index ? 'active' : ''}>
							{li}
						</li>
					))}
				</ul>
			</div>
		);
	}
);
