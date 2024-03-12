import React from 'react';
import { useParams } from 'react-router';

const FullGame = () => {
	const { id } = useParams();

	return (
		<div className="container">
			<img src="" alt="" />
			<h1>Title {id}</h1>
			<h2> 250 rubchinskih</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Blanditiis aperiam deserunt, error, recusandae voluptatem
				aspernatur ratione dolorum eveniet aliquid illo aut
				necessitatibus veniam autem asperiores culpa labore soluta
				quibusdam modi.
			</p>
			<div>
				<button>Allo</button>
			</div>
		</div>
	);
};

export default FullGame;
