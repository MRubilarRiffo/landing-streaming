import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Containers/Home/Home';
import { useDispatch } from 'react-redux';
import { getProducts } from './Redux/actions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export default App
