import React, { useContext } from 'react';
import { useRef } from 'react';
import { AppContext } from '../../App';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

export const Search = () => {
	const { searchValue, setSearchValue } = useContext(AppContext);

	const onClickClear = () => {
		setSearchValue('');
		inputRef.current.focus();
	};

	const inputRef = useRef();
	return (
		<div className={styles.container}>
			<svg
				className={styles.icon}
				xmlns="http://www.w3.org/2000/svg"
				ariaLabelledby="searchIconTitle"
				color="#2329D6"
				fill="none"
				height="48px"
				role="img"
				stroke="#2329D6"
				strokeLinecap="square"
				strokeLinejoin="miter"
				strokeWidth="1"
				viewBox="0 0 24 24"
				width="48px">
				<title id="searchIconTitle" />
				<path d="M14.4121122,14.4121122 L20,20" />
				<circle cx="10" cy="10" r="6" />
			</svg>
			<input
				ref={inputRef}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				className={styles.input}
				placeholder="Поиск... "
			/>
			{searchValue && (
				<svg
					onClick={onClickClear}
					className={styles.clear}
					xmlns="http://www.w3.org/2000/svg"
					height="48"
					viewBox="0 0 48 48"
					width="48">
					<path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
					<path d="M0 0h48v48H0z" fill="none" />
				</svg>
			)}
		</div>
	);
};
