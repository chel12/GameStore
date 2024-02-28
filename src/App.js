import './scss/app.scss';

import { Header } from './components/Header/Header';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';

function App() {
	//https://e7feb94fe973f168.mokky.dev/items

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					{/* <Home /> */}
					<NotFound />
				</div>
			</div>
		</div>
	);
}

export default App;
