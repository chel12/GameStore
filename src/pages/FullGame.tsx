import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const FullGame: React.FC = () => {
	//достаем id, вернет значение ещё
	const { id } = useParams();
	const navigate = useNavigate();
	const [game, setGame] = useState<{
		imgUrl: string;
		title: string;
		price: number;
	}>();

	useEffect(() => {
		async function fetchGame() {
			try {
				const { data } = await axios.get(
					'https://e7feb94fe973f168.mokky.dev/items/' + id
				);
				setGame(data);
			} catch (error) {
				alert('Ошибка при получение игры  ');
				navigate('/');
			}
		}
		fetchGame();
	}, []);

	if (!game) {
		return (
			<>
				<h1>Загрузка</h1>
			</>
		);
	}

	return (
		<div className="container">
			<img src={game.imgUrl} alt="" />
			<h2>{game.title}</h2>
			<h4>{game.price}</h4>
			<Link to="/">
				<button className="button button--outline button--add">
					<span>Назад</span>
				</button>
			</Link>
		</div>
	);
};

export default FullGame;
