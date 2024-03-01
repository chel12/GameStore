
export const Categories = ({ valueCategories, setValueCategories }) => {
	// const onClickCategory = (index) => {  вариант для сложных
	// 	setActiveIndex(index);
	//   ...
	//   ...
	// };

	//setActiveIndex(index) лайт варик дял простого

	const categories = [
		'Все',
		'Action',
		'Racing',
		'Strategy',
		'Sports',
		'Flight simulation',
	];

	return (
		<div className="categories">
			<ul>
				{categories.map((li, index) => (
					<li
						key={index}
						onClick={() => setValueCategories(index)}
						className={valueCategories === index ? 'active' : ''}>
						{li}
					</li>
				))}
				{/* <li className="active">Все</li>
				<li>Action</li>
				<li>Racing</li>
				<li>Strategy</li>
				<li>Sports</li>
				<li>Flight simulation</li> */}
			</ul>
		</div>
	);
};
