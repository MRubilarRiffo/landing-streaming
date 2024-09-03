import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './redux/actions';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path='*' element={<h3>Error</h3>} />
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
};

export default App;