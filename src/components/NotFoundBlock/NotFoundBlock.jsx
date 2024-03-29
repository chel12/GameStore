import React from 'react';
import styles from './NotFoundBlock.module.css';

export const NotFoundBlock = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span>😢</span>
				<br />
				Такой страницы не найдено :(
			</h1>
			<p className={styles.description}>
				К сожалению данная страница отсутствует в нашем
				интернет-магазине
			</p>
		</div>
	);
};
