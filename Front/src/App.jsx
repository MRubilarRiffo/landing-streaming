import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home Page/Home Page';
import PaymentPage from './pages/Payment Page/Payment Page';

function App() {
	return (
		<Routes>
			<Route path='*' element={<h3>Error</h3>} />
			<Route path="/" element={<HomePage />} />
			<Route path="/finalizar-pago" element={<PaymentPage />} />
		</Routes>
	);
};

export default App;