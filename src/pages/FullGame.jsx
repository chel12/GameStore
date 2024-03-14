import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const FullGame = () => {
	//достаем id, вернет значение ещё
	const { id } = useParams();
	const [game, setGame] = useState();

	useEffect(() => {
		async function fetchGame() {
			try {
				const { data } = await axios.get(
					'https://e7feb94fe973f168.mokky.dev/items/' + id
				);
				setGame(data);
			} catch (error) {
				alert('Ошибка при получение игры  ');
			}
		}
		fetchGame();
	}, []);
	if (!game) {
		return <h1>Загрузка</h1>;
	}
	return (
		<div className="container">
			<img src={game.imgUrl} alt="" />
			<h2>{game.title}</h2>
			<h4>{game.price}</h4>
		</div>
	);
};

export default FullGame;
