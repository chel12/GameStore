import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemId } from '../../redux/slices/cartSlice.js';

export const GameBlock = ({
	title,
	price,
	id,
	imgUrl,
	types,
	editions,
	category,
	rating,
}) => {
	const dispatch = useDispatch();
	const [activeType, setActiveType] = useState(0);
	const [activeExtand, setActiveExtand] = useState(0);

	const onClickAddCount = () => {
		const item = {
			id,
			title,
			price,
			imgUrl,
			type: types[activeType],
			edition: editions[activeExtand],
		};
		dispatch(addItem(item));
	};

	const cartItem = useSelector(selectCartItemId(id));
	const addedCount = cartItem ? cartItem.count : 0;

	return (
		<div className="game-block-wrapper">
			<div className="game-block">
				<img className="game-block__image" src={imgUrl} alt="Game" />
				<h4 className="game-block__title">{title}</h4>
				<div className="game-block__selector">
					<ul>
						{
							//className="active"
							types.map((type, i) => (
								<li
									key={type}
									onClick={() => setActiveType(i)}
									className={
										activeType === i ? 'active' : ''
									}>
									{type}
								</li>
							))
						}
					</ul>
					<ul>
						{
							//className="active"
							editions.map((editions, i) => (
								<li
									key={editions}
									onClick={() => setActiveExtand(i)}
									className={
										activeExtand === i ? 'active' : ''
									}>
									{editions}
								</li>
							))
						}
					</ul>
				</div>
				<div className="game-block__bottom">
					<div className="game-block__price">от {price} ₽</div>
					<button
						className="button button--outline button--add"
						onClick={onClickAddCount}>
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"></path>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GameBlock;
