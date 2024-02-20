import './scss/app.scss';

import { Header } from './components/Header/Header';
import { Categories } from './components/Categories/Categories';
import { Sort } from './components/Sort/Sort';
import { GameBlock } from './components/GameBlock/GameBlock';

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все игры</h2>
					<div className="content__items">
						<GameBlock title={'GTA VI'} price={4990} />
						<GameBlock title={'GTA V'} price={3990} />
						<GameBlock title={'GTA IV'} price={2990} />
						<GameBlock title={'GTA III'} price={1990} />
						<GameBlock title={'GTA II'} price={990} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
