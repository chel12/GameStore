import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
	return (
		<>
			<div class="cart cart--empty">
				<h2>
					Корзина пустая <icon>😕</icon>
				</h2>
				<p>
					Вероятней всего, вы не добавили ещё игру.
					<br />
					Для того, чтобы заказать игру, перейди на главную страницу.
				</p>
				<img src="/img/empty-cart.png" alt="Empty cart" />
				<Link to="/" class="button button--black">
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
};
export default CartEmpty;
