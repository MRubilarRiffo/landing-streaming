import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Containers/Home/Home';
import { useDispatch } from 'react-redux';
import { getProducts } from './Redux/actions';
import { Admin } from './Containers/Admin/Admin';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <Routes>
            <Route path='/streaming-test' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<h3>Error</h3>} />
        </Routes>
    )
}

export default App