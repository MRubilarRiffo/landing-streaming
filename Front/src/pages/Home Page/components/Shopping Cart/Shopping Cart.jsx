import styles from './Shopping Cart.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCloseModal from '../../../../components/Button Close Modal/Button Close Modal';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ setShowShoppingCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [state, setState] = useState({
        activeCart: false,
    })

    const { activeCart } = state;
    const { container, cart, activeCart: activeCartStyle } = styles;

    useEffect(() => {
        setState(prevState => ({ ...prevState, activeCart: true }));
    }, []);

    return (
        <div className={container}>
            <div className={`${cart} ${activeCart && activeCartStyle}`}>
                <ButtonCloseModal setCloseModal={setShowShoppingCart} />
                <h3>Carrito</h3>
            </div>
        </div>
    );
};

export default ShoppingCart;