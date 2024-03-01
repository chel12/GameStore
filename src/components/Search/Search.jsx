import React from 'react';
import styles from './Search.module.scss';

export const Search = () => {
	return (
		<div className={styles.container}>
			<svg
				className={styles.icon}
				xmlns="http://www.w3.org/2000/svg"
				aria-labelledby="searchIconTitle"
				color="#2329D6"
				fill="none"
				height="48px"
				role="img"
				stroke="#2329D6"
				stroke-linecap="square"
				stroke-linejoin="miter"
				stroke-width="1"
				viewBox="0 0 24 24"
				width="48px">
				<title id="searchIconTitle" />
				<path d="M14.4121122,14.4121122 L20,20" />
				<circle cx="10" cy="10" r="6" />
			</svg>
			<input
				className={styles.input}
				placeholder="Поиск... "
				type="text"
			/>
		</div>
	);
};
