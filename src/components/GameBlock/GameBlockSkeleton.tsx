import React from 'react';
import ContentLoader from 'react-content-loader';

const GameBlockSkeleton: React.FC = (props) => (
	<ContentLoader
		className="game-block"
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<circle cx="104" cy="104" r="104" />
		<rect x="0" y="231" rx="10" ry="10" width="200" height="28" />
		<rect x="0" y="278" rx="9" ry="9" width="203" height="64" />
		<rect x="1" y="358" rx="10" ry="10" width="91" height="41" />
		<rect x="108" y="358" rx="10" ry="10" width="95" height="40" />
	</ContentLoader>
);

export default GameBlockSkeleton;
